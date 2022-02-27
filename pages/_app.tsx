import 'src/scss/_index.scss'
import type {AppProps} from 'next/app'
import Head from "next/head";
import MyHeader from "../src/components/layouts/Header/MyHeader";
import {useRouter} from "next/router";
import mainMenu from '../store/MainMenu'
import {useEffect} from "react";
import Container from "@mui/material/Container";

//Главный компонент обертки приложения
function MyApp({Component, pageProps}: AppProps) {

    return (
        <>
            <MyHeader/>
            <Container>
                <Component {...pageProps} />
            </Container>
        </>
    )
}

export default MyApp
