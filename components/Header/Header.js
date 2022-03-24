import React from 'react';
import Container from '@mui/material/Container';
import MainMenu from "./MainMenu/MainMenu";
import Logo from "../Logo/Logo";
import style from "./header.module.scss"
import cl from "classname"

const Header = () => {
    const classesContainer = cl(
        'body-pallet',
        style.container
    )
    return (
        <>
            <header className={style.header}>
                <Container fixed>
                    <div className={classesContainer}>
                        <Logo className={style.logo}/>
                        <MainMenu/>
                    </div>
                </Container>
            </header>
            <Container className={style.mobileLogo}>
                <Logo />
            </Container>

        </>
    );
};

export default Header;