import type {NextPage} from 'next'
import Container from "@mui/material/Container";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";

const About: NextPage = () => {
    return (
        <div>
            <h1>О нас</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid beatae cupiditate dicta dolores
                ducimus eligendi eos illum, ipsum, iusto laboriosam, mollitia neque nostrum obcaecati praesentium quae
                quibusdam quidem reprehenderit sed.
            </p>
        </div>
    )
};

export default About;