import React from 'react';
import style from "./mobilemenu.module.scss"
import MobileMenuItem from "./MobileMenuItem";
import {useRouter} from "next/router";

const MobileMenu = () => {
    const router = useRouter()

    let list = [
        {
            id: 1,
            label: 'Главная',
            icon: 'home',
            url: '/',
            isActive: false
        },
        {
            id: 2,
            label: 'Каталог',
            icon: 'catalog',
            url: '/catalog',
            isActive: false
        },
        {
            id: 3,
            label: 'Профиль',
            icon: 'user',
            url: '/user',
            isActive: false
        }
    ]

    const initActiveItem = (slug) => {
        list.forEach((item) => {
            item.isActive = slug === item.url;
        })
    }

    initActiveItem(router.route)

    return (
        <nav className={style.nav}>
            {
                list.map((item) => (
                    <MobileMenuItem item={item} key={item.id}/>
                ))
            }
        </nav>
    );
};

export default MobileMenu;