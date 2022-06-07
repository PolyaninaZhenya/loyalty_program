import style from './CatalogItem.module.scss'
import {useState} from "react";
import Skeleton from '@mui/material/Skeleton';
import Link from "next/link"

const CatalogItem = ({post}) => {
    return (
        <div className={style.container}>
            <Link href={`/catalog/${post?.id ?? post?.data.ID}`}>
                <a>
                {
                    post &&
                        <div className={style.wrapper}
                             style={{
                                 backgroundImage: `url(${post.acf.main_image?.sizes?.medium ?? post.data.acf.main_image?.sizes?.medium ?? '/empty.png'})`,
                                 backgroundPosition: 'center'
                        }}

                        >
                            <span dangerouslySetInnerHTML={{__html: post?.title?.rendered ?? post?.post_title}} className={style.title}/>
                        </div>
                }
                </a>
            </Link>
        </div>
    );
};

export default CatalogItem;