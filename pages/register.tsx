import type {NextPage} from 'next'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from 'src/components/TabPanel/TabPanel'
import {SetStateAction, useState} from "react";
import FormRegister from "../src/components/FormRegister/FormRegister";
import FormRegisterUL from "../src/components/FormRegister/FormRegisterUL";

const Register: NextPage = () => {

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = useState(0); // Обьявляем внутренее состояние табов

    // Обработчик изменения активного таба
    const handleChange = (event: any, newValue: SetStateAction<number>) => {
        setValue(newValue);
    };

    return (
        <div className={'row'}>
            <div className={'body-plate page-register'}>
                <div className={'title title-h3'}>Регистрация</div>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Как пользователь" {...a11yProps(0)} className={'myTab'}/>
                    <Tab label="Как юридическое лицо" {...a11yProps(1)} className={'myTab'}/>
                </Tabs>

                <TabPanel index={0} value={value}>
                    <FormRegister/>
                </TabPanel>
                <TabPanel index={1} value={value}>
                    <FormRegisterUL/>
                </TabPanel>
            </div>
        </div>
    )
};

export default Register;