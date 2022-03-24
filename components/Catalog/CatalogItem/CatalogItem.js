import style from './CatalogItem.module.scss'
import {useState} from "react";
import Skeleton from '@mui/material/Skeleton';
import Link from "next/link"

const CatalogItem = ({post, image}) => {
    const [dataImg, setDataImg] = useState()
    image.then(res => setDataImg(res))

    console.log(dataImg)

    return (
        <div className={style.container}>
            <Link href={`/catalog/${post.id}`}>
                {
                    dataImg ? (
                        <div className={style.wrapper} style={{backgroundImage: `url(${dataImg[0].media_details.sizes.medium.source_url})`}}>
                            <span dangerouslySetInnerHTML={{__html: post.title.rendered}} className={style.title}/>
                        </div>
                    ) : (
                        <Skeleton variant="rectangular" height={'100%'} className={style.skeleton}/>
                    )
                }
            </Link>
        </div>
    );
};

export default CatalogItem;