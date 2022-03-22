import style from './CatalogItem.module.scss'
import {useState} from "react";

const CatalogItem = ({ post, image }) => {
    const [dataImg, setDataImg] = useState()
    image.then(res => setDataImg(res))
    console.log(dataImg)

    return (
        <div className={style.container}>
            {
                dataImg && <div className={style.wrapper} style={{backgroundImage: `url(${dataImg[0].source_url})`}}>
                <span dangerouslySetInnerHTML={{__html: post.title.rendered}} className={style.title}/>
                </div>
            }
        </div>
    );
};

export default CatalogItem;