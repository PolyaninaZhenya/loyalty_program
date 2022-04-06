import React, {useRef, useState} from "react";
import cl from "classname"
import style from "./cataloglist.module.scss"
import CatalogItem from "./CatalogItem/CatalogItem";
import 'swiper/css';
import axios from 'axios'
import Grid from "@mui/material/Grid";

const CatalogListAccount = (props) => {

    const {
        className,
        posts
    } = props

    const mainClasses = cl(
        'body-pallet',
        style.container,
        className
    )

    const titleClass = cl(
        'title',
        style.title
    )

    const getImage = async (id) => {
        let buffer = await fetch(`http://fine02r4.beget.tech/wp-json/wp/v2/media?parent=${id}`)
        return await buffer.json()
    }

    return (
        <>
            <Grid container spacing={4}>

                {
                    posts && posts?.map((post) => (
                        <Grid item xs={12} md={6} lg={4} key={post.id}>
                            <CatalogItem post={post} image={getImage(post.id)}/>
                        </Grid>
                        )
                    )
                }
            </Grid>
        </>
    );
};

export default CatalogListAccount;