import React from 'react';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import style from './FormLogin.module.scss'
import cl from 'classnames'
import NextLink from 'next/link'

{/*
---------------------------------------------
-- Компонент Формы входа для клиента
---------------------------------------------
*/}
const Formlogin = (props) => {
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
                className={style.form}
                autoComplete="off"
            >
                <FormGroup>
                    <TextField
                        id="username"
                        label="Логин"
                        variant="standard"
                        fullWidth={true}
                        className={style.input}
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
                            className={style.button}
                    >
                        Войти
                    </Button>
                </div>
                <div className={style.footer}>
                    <NextLink href="/register">
                        <a>Создать учетну  запись</a>
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