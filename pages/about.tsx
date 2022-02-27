import type { NextPage } from 'next'
import Container from "@mui/material/Container";
import {useRouter} from "next/router";
import mainMenu from "../store/MainMenu";
import {observer} from "mobx-react-lite";

const About: NextPage = () => {
    return (
        <div>
            <h1>О нас</h1>
        </div>
    )
};

export default About;