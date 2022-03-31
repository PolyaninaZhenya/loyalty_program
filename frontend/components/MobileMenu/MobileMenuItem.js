import React from 'react';
import style from "./mobilemenu.module.scss"
import HomeIcon from '@mui/icons-material/Home';
import BallotIcon from '@mui/icons-material/Ballot';
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
import cl from "classname"
import Avatar from "@mui/material/Avatar";
import {useAuth} from "../../context/auth";

const MobileMenuItem = ({item}) => {
    const {user, login, logout} = useAuth();
    const classItem = cl(
        {
            [style.item]: true,
            [style.active]: item.isActive,
        })

    return (
        <Link href={item.url}>
            <a className={classItem}>
                <span className={style.icon}>
                    {item.icon === 'home' && <HomeIcon/>}
                    {item.icon === 'catalog' && <BallotIcon/>}
                    {item.icon === 'user' && <Avatar sx={{width: 32, height: 32}} src={user.photoURL}/>}
                </span>
                <span className={style.label}>{item.label}</span>
            </a>
        </Link>
    );
};

export default MobileMenuItem;