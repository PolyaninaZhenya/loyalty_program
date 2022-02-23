import React from 'react';
import style from './MyHeader.module.scss'
import Logo from 'public/logo.svg'
import Container from '@mui/material/Container';
import { Auth, User } from 'firebase/auth';
import MainMenu from "../MainMenu/MainMenu";
import { observer } from "mobx-react-lite";
import Link from 'next/link'
import mainMenu from '../../../../store/MainMenu'
import {useRouter} from "next/router";

interface MyHeaderProps {
    auth?: Auth,
    user?: User
}
{/*
---------------------------------------------
-- Компонент Header для сайта импортируеться на каждой странице сайта
---------------------------------------------
*/}
const MyHeader = observer((props) => {
    const router = useRouter()
    mainMenu.initActive(router.route)

    return (
        <header className={style.header}>
            <Container className={style.container}>
                <Link href={'/'}>
                    <a className={style.logo}><Logo /></a>
                </Link>
                <MainMenu list={mainMenu.list}/>
            </Container>
        </header>
    );
})

export default MyHeader;