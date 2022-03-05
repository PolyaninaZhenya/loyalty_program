import style from './MainMenu.module.scss'
import React, {FC} from "react";
import cl from 'classnames'
import MenuItem, { MenuItemProps } from './MenuItem/MenuItem'
import {useAuth} from "../../../context/auth";
import mainMenu from '../../../../store/MainMenu'
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";

interface MainMenuProps {
    className?: string
}

const MainMenu = observer((props: MainMenuProps) => {

    const router = useRouter()
    mainMenu.initActive(router.route)

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
                mainMenu.list.map((item) => (
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
});

export default MainMenu;