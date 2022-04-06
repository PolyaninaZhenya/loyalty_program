import {useAuth} from "../context/auth";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import backend from "../backend/clientWp";
import {useEffect, useState} from "react";
import CatalogListAccount from "../components/Catalog/CatalogListAccount";
import axios from "axios";

const Account = () => {
    return (
        <div>
            <div className={'body-pallet'}>
                <h2 className={'mb-32'}>Личный кабинет</h2>
                <div>
                    {/*{*/}
                    {/*    myPosts ? (<CatalogListAccount posts={myPosts} className={'mv-32'}/>) :*/}
                    {/*    (<div>Здесь пока ничего нет</div>)*/}
                    {/*}*/}
                </div>
            </div>
        </div>
    );
};

export default Account;