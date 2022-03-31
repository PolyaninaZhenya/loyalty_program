import React from 'react';
import Link from "next/link"
import style from "./logo.module.scss"
import cl from "classname"

const Logo = (props) => {

    // Обьединяем классы внутрение и внешние передоваемые через Props
    const classes = cl([
        style.logo,
        props.className
    ])

    return (
        <>
            <Link href={'/'}>
                <a className={classes}><img src="/logo.svg" alt="ommo"/></a>
            </Link>

        </>
    );
};

export default Logo;