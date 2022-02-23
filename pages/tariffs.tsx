import type { NextPage } from 'next'
import Container from "@mui/material/Container";
import {useRouter} from "next/router";
import mainMenu from "../store/MainMenu";
import {observer} from "mobx-react-lite";
import TariffItem from "../src/components/TariffItem/TarifItem";
import Head from "next/head";

const Tariffs: NextPage = () => {
    return (
        <>
            <Head>
                <title>Тарифы</title>
            </Head>
            <Container>
                <h1>Тарифы</h1>
                <TariffItem/>
            </Container>
        </>
    )
};

export default Tariffs;