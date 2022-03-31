import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Formlogin from "../components/FormLogin/Formlogin";
import TabPanel from '../components/TabPanel/TabPanel'
import backend from "../backend/clientWp";
import {useAuth} from "../context/auth";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Login() {
    const [value, setValue] = useState(0); // Обьявляем внутренее состояние табов

    const {user, login, logout} = useAuth();

    const router = useRouter()

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    // Обработчик изменения активного таба
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (user) {
            router.push('/account')
        }
    })

    return (
        <div className={'row row_login'}>
            <div className={'body-pallet page-login'}>
                <div className={'title title-h3'}>Вход</div>
                <Formlogin/>
                <div className={'mv-8'}><small>или войдите с помощью</small></div>
                <div>
                    <button onClick={login}>google</button>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps(context) {
    return {
        props: {},
    }
}