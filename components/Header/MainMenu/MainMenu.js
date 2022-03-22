import style from "./mainmenu.module.scss"
import UserMenu from "../UserMenu/UserMenu";
import Link from "next/link";

const MainMenu = () => {
    let list = [
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
            label: 'Войти',
            href: '/login',
            active: false,
        },
        {
            id: 4,
            label: 'Личный кабинет',
            href: '/account',
            active: false,
        }
    ]

    return (
        <>
            <nav className={style.nav}>
                <ul className={style.ul}>
                    <li><Link href="/tariffs"><a>Тарифы</a></Link></li>
                    <li><Link href="/catalog"><a>Каталог</a></Link></li>
                    <li><Link href="/catalog"><a>Контакты</a></Link></li>
                </ul>
            </nav>
            <UserMenu/>
        </>
    );
};

export default MainMenu;