import Grid from "@mui/material/Grid";
import backend from "../../backend/clientWp";
import Image from 'next/image'
import {useAuth} from "../../context/auth";
import Barcode from 'react-jsbarcode';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Qs from 'qs'
import axios from 'axios'
import API from "../../utils/api";

export default function CatalogSingle({post}) {
    const {user} = useAuth()
    const [userCard, setUserCard] = useState(null)
    const router = useRouter()

    const [vendor, setVendor] = useState()

    const getVendor = async (id) => {
        return await API.get(`ommo/v2/get_vendor?id=${id}`)
    }

    const getUserCard = async () => {
        const response = (await API.get('ommo/v2/get_user_card', {
            params: {
                uid: user.uid,
                cardId: post.id
            }
        })).data

        if (response.ID) {
            setUserCard(response)
        } else {
            setUserCard(null)
        }
    }

    useEffect(() => {
        if (post?.acf?.vendor_id) {
            backend.vendor()
                .id(post?.acf?.vendor_id)
                .then(response => {
                    setVendor(response)
                })
        }
    }, [])

    useEffect(() => {
        if (user) {
            getUserCard()
        }
    }, [user])

    const addUser = async () => {
        if (user) {
            const params = {
                postId: post.id,
                userId: user.uid
            }
            const response = await API.get('ommo/v2/add_user_for_card', {
                params
            })
                .catch(e => {
                console.log(e)
            })

            console.log(response)

            getUserCard()
        }
    }

    const deleteUser = async () => {
        if (user) {
            const response = await API.post('/ommo/v2/delete_user_for_card', {
                id: userCard.ID,
            })

            getUserCard()
        }
    }

    const editProgram = () => {
        router.push(`/edit/${post.id}`)
    }

    return (
        <>
            <div className={'body-pallet'}>
                <Grid className={'catalog-single'} container spacing={2}>
                    <Grid item xs={12} lg={4}>
                        <div className={'card'}>
                            <Image src={post.acf?.main_image?.url ?? '/empty.png'} layout={'fill'}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <h1 dangerouslySetInnerHTML={{__html: post.title.rendered}}/><br/>
                        {
                            user &&
                            <>
                                <button
                                    className={'my-button__primary'}
                                    onClick={() => {
                                        if (!userCard) {
                                            addUser()
                                        } else {
                                            deleteUser()
                                        }
                                    }}
                                >
                                    {!userCard ? 'Добавить себе' : 'Удалить'}
                                </button>
                                {
                                    user.uid === vendor?.acf?.uid ?
                                        <button
                                            className={'my-button__primary'}
                                            style={{marginLeft: '8px'}}
                                            onClick={editProgram}
                                        >
                                            Редактировать
                                        </button> : false
                                }
                            </>
                        }
                        {
                            !user && <span>Войдите в систему что бы добавить карту себе</span>
                        }
                    </Grid>
                </Grid>
            </div>
            {
                userCard?.acf?.number &&
                <div className={'body-pallet mv-32 barcode-block'}>
                    <Barcode value={userCard.acf.number} options={{format: 'code128'}}/>
                </div>
            }
            {
                post.content.rendered && <div className={'body-pallet mv-32'}>
                    <div>
                        <h3 className={'mb-16'}>Описание</h3>
                        <div dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
                    </div>
                </div>
            }
        </>
    )
}

export async function getServerSideProps({params}) {
    const post = await backend.card().id(params.id)

    return {
        props: {
            post
        },
    }
}