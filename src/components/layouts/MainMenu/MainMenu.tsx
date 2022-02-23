import style from './MainMenu.module.scss'
import React, {FC} from "react";
import cl from 'classnames'
import MenuItem, { MenuItemProps } from './MenuItem/MenuItem'

interface MainMenuProps extends React.Component {
    className?: string,
    list: Array<MenuItemProps>,
    auth?: boolean,
}

const MainMenu: FC<MainMenuProps> = (props) => {

    // Делаем реструкторизацию пропсов /
    const {
        className,
        auth = false,
        list,
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