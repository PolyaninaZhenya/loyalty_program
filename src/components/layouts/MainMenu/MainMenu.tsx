import style from './MainMenu.module.scss'
import React, {FC, useEffect} from "react";
import cl from 'classnames'
import MenuItem, { MenuItemProps } from './MenuItem/MenuItem'
import {useRouter} from "next/router";

interface MainMenuProps {
    className?: string
}

const MainMenu = (props: MainMenuProps) => {

    const router = useRouter()

    const list = [
        {
            id: 1,
            label: 'Тарифы',
            href: '/tariffs',
            active: true,
        },
        {
            id: 2,
            label: 'О проекте',
            href: '/about',
            active: false,
        },
        {
            id: 3,
            label: 'Поддержка',
            href: '/support',
            active: false,
        },
        {
            id: 4,
            label: 'Войти',
            href: '/login',
            active: false,
        }
    ]

    const setActiveMenu = (slug: string) => {
        //Сбрасываем со всех пунктов меню активное состояние
        list.forEach(item => {
            item.active = false

            if (slug === item.href) {
                item.active = true
            }
        })
    }

    setActiveMenu(router.route)

    // Делаем реструкторизацию пропсов /
    const {
        className,
        ...rest
    } = props

    //Обьединяем классы из пропсов и классы по умолчанию в один обьект
    const classesNav = cl(
        className,
        style.wrapper
    )

    return (
        <nav className={classesNav} {...rest}>
            {
                list.map((item) => (
                    <MenuItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        href={item.href}
                        active={item.active}
                        />
                ))
            }
        </nav>
    );
};

export default MainMenu;