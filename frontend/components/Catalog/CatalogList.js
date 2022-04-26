import React, {useRef, useState} from "react";
import cl from "classname"
import style from "./cataloglist.module.scss"
import CatalogItem from "./CatalogItem/CatalogItem";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

const CatalogList = (props) => {

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

    return (
        <>
            <div className={mainClasses}>
                <div className={titleClass}>Наши партнеры</div>
                <Swiper
                    spaceBetween={16}
                    slidesPerView={3.3}
                    longSwipes={true}
                    mousewheel={
                        true
                    }
                    breakpoints={{
                        0: {
                            slidesPerView: 1.5,
                            spaceBetween: 16
                        },
                        768: {
                            slidesPerView: 1.5,
                            spaceBetween: 16
                        },
                        1200: {
                            slidesPerView: 3.3,
                            spaceBetween: 16
                        },
                    }}
                >
                    {
                        posts && posts?.map((post) => (
                                <SwiperSlide key={post.id}>
                                    <CatalogItem post={post}/>
                                </SwiperSlide>
                            )
                        )
                    }
                </Swiper>
            </div>
        </>
    );
};

export default CatalogList;