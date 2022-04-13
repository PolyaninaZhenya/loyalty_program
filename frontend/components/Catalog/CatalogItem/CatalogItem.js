import style from './CatalogItem.module.scss'
import {useState} from "react";
import Skeleton from '@mui/material/Skeleton';
import Link from "next/link"

const CatalogItem = ({post}) => {
    return (
        <div className={style.container}>
            <Link href={`/catalog/${post?.id ?? post?.ID}`}>
                <a>
                {
                    post.acf.main_image ? (
                        <div className={style.wrapper} style={{backgroundImage: `url(${post.acf.main_image.sizes.medium})`}}>
                            <span dangerouslySetInnerHTML={{__html: post?.title?.rendered ?? post?.post_title}} className={style.title}/>
                        </div>
                    ) : (
                        <Skeleton variant="rectangular" height={'100%'} className={style.skeleton}/>
                    )
                }
                </a>
            </Link>
        </div>
    );
};

export default CatalogItem;