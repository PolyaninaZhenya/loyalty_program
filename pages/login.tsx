import type {NextPage} from 'next'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Formlogin from "../src/components/FormLogin/Formlogin";
import TabPanel from 'src/components/TabPanel/TabPanel'
import {SetStateAction, useState} from "react";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Login: NextPage = () => {
    const [value, setValue] = useState(0); // Обьявляем внутренее состояние табов

    // Обработчик изменения активного таба
    const handleChange = (event: any, newValue: SetStateAction<number>) => {
        setValue(newValue);
    };

    return (
        <div className={'row row_login'}>
            <div className={'body-plate page-login'}>
                <div className={'title title-h3'}>Вход</div>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Клиент" {...a11yProps(0)} className={'myTab'}/>
                    <Tab label="Организация" {...a11yProps(1)} className={'myTab'}/>
                </Tabs>

                <TabPanel index={0} value={value}>
                    <Formlogin/>
                </TabPanel>
                <TabPanel index={1} value={value}>
                    Item Two
                </TabPanel>
            </div>
        </div>
    )
};

export default Login;