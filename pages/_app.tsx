import 'src/scss/_index.scss'
import type {AppProps} from 'next/app'
import Head from "next/head";
import MyHeader from "../src/components/layouts/Header/MyHeader";
import {useRouter} from "next/router";
import mainMenu from '../store/MainMenu'
import {useEffect} from "react";

//Главный компонент обертки приложения
function MyApp({Component, pageProps}: AppProps) {

    return (
        <>
            <MyHeader/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
