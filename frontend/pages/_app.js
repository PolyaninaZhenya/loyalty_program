import '../scss/variables.scss';
import '../scss/typograph.scss';
import '../scss/globals.scss'
import Container from '@mui/material/Container';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import {AuthProvider} from "../context/auth"
import NextNProgress from "nextjs-progressbar";
import Router from "next/router";

// Подключаем провайдер темы
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../themes/main';
import createEmotionCache from '../themes/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();


function MyApp(props) {
    const {Component, emotionCache = clientSideEmotionCache, pageProps, router} = props;

    return (
        <>
            <AuthProvider>
                <NextNProgress
                    color="#000585"
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={3}
                    showOnShallow={true}
                    nonce="my-nonce"
                    options={null}
                />
                <Header/>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Container fixed>
                        <Component {...pageProps} />
                    </Container>
                </ThemeProvider>
                <Footer/>
            </AuthProvider>
        </>
    )
}

export default MyApp
