import 'src/scss/_index.scss'
import type {AppProps} from 'next/app'
import Head from "next/head";
import MyHeader from "../src/components/layouts/Header/MyHeader";
import {useRouter} from "next/router";
import mainMenu from '../store/MainMenu'
import {useEffect} from "react";
import Container from "@mui/material/Container";
import {getAuth} from "firebase/auth";
import app from "../firebase/clientApp";
import {useAuthState} from "react-firebase-hooks/auth";
import {AuthProvider} from "../src/context/auth"

//Главный компонент обертки приложения
function MyApp({Component, pageProps}: AppProps) {

    return (
        <AuthProvider>
            <MyHeader/>
            <Container>
                <Component {...pageProps} />
            </Container>
        </AuthProvider>
    )
}

export default MyApp
