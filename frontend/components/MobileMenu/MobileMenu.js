import React, {useEffect, useState} from 'react';
import style from "./mobilemenu.module.scss"
import MobileMenuItem from "./MobileMenuItem";
import {useRouter} from "next/router";
import {useAuth} from "../../context/auth";

const MobileMenu = () => {
    const router = useRouter()
    const {user, login, logout} = useAuth();

    return (
        <nav className={style.nav}>
            <MobileMenuItem item={{
                id: 1,
                label: 'Главная',
                icon: 'home',
                url: '/',
                isActive: false
            }}/>
            <MobileMenuItem item={{
                id: 2,
                label: 'Каталог',
                icon: 'catalog',
                url: '/catalog',
                isActive: false
            }}/>
            {
                user ? (
                    <MobileMenuItem item={{
                        id: 3,
                        label: 'Профиль',
                        icon: 'user',
                        url: '/account',
                        isActive: false
                    }}/>
                ) : (
                    <MobileMenuItem item={{
                        id: 3,
                        label: 'Войти',
                        icon: 'catalog',
                        url: '/login',
                        isActive: false
                    }}/>
                )
            }
        </nav>
    );
};

export default MobileMenu;