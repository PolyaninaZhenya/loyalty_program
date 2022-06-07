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

    console.log(posts)

    const mainClasses = cl(
        'body-pallet',
        style.container,
        className
    )

    const titleClass = cl(
        'title',
        style.title
    )

    return (
        <>
            <Grid container spacing={4}>
                {
                    posts?.map((post) => (
                        <Grid item xs={12} md={6} lg={4} key={post.ID}>
                            <CatalogItem post={post}/>
                        </Grid>
                        )
                    )
                }
            </Grid>
        </>
    );
};

export default CatalogListAccount;