import React, {FC, ReactHTML} from "react";
import style from './MenuItem.module.scss'
import Link from 'next/link'
import cl from 'classnames'

export type MenuItemProps = {
    id: number,
    label: string,
    href: string,
    active: boolean,
    className?: string,
}


const MenuItem: FC<MenuItemProps> = (props) => {
    const {
        id,
        label,
        href,
        active,
        className,
        ...rest
    } = props

    const classesItem = cl(
        className,
        style.item,
        active && style.active
    )

    return (
        <Link href={href}>
            <a  className={classesItem} {...rest}>
                {label}
            </a>
        </Link>
    );
};

export default MenuItem;