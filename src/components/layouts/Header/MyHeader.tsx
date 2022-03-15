import React, {FC} from 'react';
import style from './MyHeader.module.scss'
import Logo from 'public/logo.svg'
import Container from '@mui/material/Container';
import MainMenu from "../MainMenu/MainMenu";
import { observer } from "mobx-react-lite";
import Link from 'next/link'
import {useAuth} from "../../../context/auth";

{/*
---------------------------------------------
-- Компонент Header для сайта импортируеться на каждой странице сайта
---------------------------------------------
*/}
const MyHeader: FC = () => {
    const {user, login, logout} = useAuth();

    return (
        <header className={style.header}>
            <Container className={style.container}>
                <Link href={'/'}>
                    <a className={style.logo}><Logo /></a>
                </Link>
                <MainMenu user={user}/>
            </Container>
        </header>
    );
}

export default MyHeader;