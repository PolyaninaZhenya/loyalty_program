import Grid from "@mui/material/Grid";
import backend from "../../backend/clientWp";
import Image from 'next/image'
import {useAuth} from "../../context/auth";
import Barcode from 'react-jsbarcode';
import {useEffect, useState} from "react";

export default function CatalogSingle({post}) {
    const {user} = useAuth()
    const findUser = () => {
        // const userFind = post.acf.users.find((item) => {
        //     console.log(item)
        //     return item.uid === user.uid;
        // })
        //
        // console.log(userFind)
    }

    findUser()

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
                        <h1 dangerouslySetInnerHTML={{__html: post.title.rendered}}/>
                    </Grid>
                </Grid>
            </div>
            {/*{*/}
            {/*    userCard &&*/}
            {/*    <div className={'body-pallet mv-32 barcode-block'}>*/}
            {/*        <Barcode value={userCard.card_id}/>*/}
            {/*    </div>*/}
            {/*}*/}
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