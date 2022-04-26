import Grid from "@mui/material/Grid";
import backend from "../../backend/clientWp";
import Image from 'next/image'
import {useAuth} from "../../context/auth";
import Barcode from 'react-jsbarcode';
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Qs from 'qs'
import axios from 'axios'

export default function CatalogSingle({post}) {
    const {user} = useAuth()
    const [userCard, setUserCard] = useState({})

    useEffect(() => {
        if (user && post.acf.user) {
            fetch(`http://admin.ommo.loc/wp-json/ommo/v2/get_vendor?id=${user.uid}`)
                .then(response => response.json())

            const userFind = post.acf.user?.find((item) => {
                return item.uid === user.uid;
            })

            setUserCard(userFind)
        }
    }, [user, post.acf.user])

    const getNewData = async () => {
        const postNew = await backend.card().id(post.id)

        if (postNew.acf.user && user) {
            const userFind = postNew.acf.user.find((item) => {
                return item.uid === user.uid;
            })
            setUserCard(userFind)
        } else {
            setUserCard(null)
        }
    }

    const addUser = async () => {
        if (user) {
            const params = {
                postId: post.id,
                userId: user.uid
            }
            const response = await axios.get('http://admin.ommo.loc/wp-json/ommo/v2/add_user_for_card', {
                params
            })
            await getNewData()
        }
    }

    const deleteUser = async () => {
        if (user) {
            const params = {
                postId: post.id,
                userId: user.uid
            }
            const response = await axios.get('http://admin.ommo.loc/wp-json/ommo/v2/delete_user_for_card', {
                params
            })

            await getNewData()
        }
    }

    return (
        <>
            <div className={'body-pallet'}>
                <Grid className={'catalog-single'} container spacing={2}>
                    <Grid item xs={12} lg={4}>
                        <div className={'card'}>
                            <Image src={post.acf?.main_image?.url} layout={'fill'}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <h1 dangerouslySetInnerHTML={{__html: post.title.rendered}}/><br/>
                        {
                            user &&
                                    <button
                                        className={'my-button__primary'}
                                        onClick={() => {
                                            if (!userCard?.number) {
                                                addUser()
                                            }else {
                                                deleteUser()
                                            }
                                        }}
                                    >
                                        {!userCard?.number ? 'Добавить себе' : 'Удалить'}
                                    </button>
                        }
                    </Grid>
                </Grid>
            </div>
            {
                userCard?.number &&
                <div className={'body-pallet mv-32 barcode-block'}>
                    <Barcode value={userCard.number} options={{format: 'code128'}}/>
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