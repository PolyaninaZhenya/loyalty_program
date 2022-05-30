import React, {useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import style from './FormLogin.module.scss'
import cl from 'classnames'
import NextLink from 'next/link'
import {useAuth} from "../../context/auth";

{/*
---------------------------------------------
-- Компонент Формы входа для клиента
---------------------------------------------
*/}
const Formlogin = (props) => {

    const {user, loginEmail, loading, error} = useAuth()
    const [emailError, setEmailError] = useState({
        error: false,
        message: null
    })

    const [passwordError, setPasswordError] = useState({
        error: false,
        message: null
    })

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const classesForm = cl(
        style.form,
        // {[style.loading] : !loading}
    )

    useEffect(() => {
        if (error === 'Firebase: Error (auth/invalid-email).') {
            setEmailError({...emailError, error: true, message: 'Неправильный email'})
        }else if(error === 'Firebase: Error (auth/user-not-found).') {
            setEmailError({...emailError, error: true, message: 'Пользователь ненайден'})
        }
    }, [error])

    return (
        <div>
            <Box
                component="form"
                sx={{
                    width: '320px',
                    display: 'flex',
                    gap: '16px',
                    flexDirection: 'column'
                }}
                noValidate
                className={classesForm}
                autoComplete="off"
            >
                <FormGroup>
                    <TextField
                        id="username"
                        label="Логин"
                        variant="standard"
                        fullWidth={true}
                        className={style.input}
                        value={userData.email}
                        error={emailError.error}
                        helperText={emailError.message}
                        onChange={(event) => setUserData({...userData, email: event.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        id="userpassword"
                        label="Пароль"
                        type={'password'}
                        variant="standard"
                        fullWidth={true}
                        className={style.input}
                        value={userData.password}
                        error={error === 'Firebase: Error (auth/wrong-password).'}
                        onChange={(event) => setUserData({...userData, password: event.target.value})}
                    />
                </FormGroup>
                <div className={style.line}>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Запомнить меня"
                        className={cl(style.input, style.forgotMe)}
                    />
                    <Button variant="contained"
                            size={'large'}
                            component="span"
                            type={'submit'}
                            className={style.button}
                            onClick={() => {
                                loginEmail(userData.email, userData.password)
                            }}
                    >
                        Войти
                    </Button>
                </div>
                <div className={style.footer}>
                    <NextLink href="/register">
                        <a>Создать учетну запись</a>
                    </NextLink>
                    |
                    <NextLink href="/">
                        <a>Забыли пароль?</a>
                    </NextLink>
                </div>
            </Box>
        </div>
    );
};

export default Formlogin;