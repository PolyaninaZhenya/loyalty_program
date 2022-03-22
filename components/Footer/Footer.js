import React from 'react';
import Container from "@mui/material/Container";
import MobileMenu from "../MobileMenu/MobileMenu";
import Logo from "../Logo/Logo";
import style from './footer.module.scss'
import cl from "classname"

const Footer = () => {

    const classesContainer = cl([
        style.container,
        'body-pallet'
    ])
    return (
        <>
            <footer className={[style.footer, 'mv-32']}>
                <Container fixed>
                    <div className={classesContainer}>
                        <Logo className={style.logo}/>
                        <span className={style.copy}>© 2022, Все права защищены</span>
                    </div>
                </Container>
            </footer>
            <MobileMenu/>
        </>

    );
};

export default Footer;