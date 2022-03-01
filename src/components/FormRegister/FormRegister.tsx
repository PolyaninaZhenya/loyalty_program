import TextField from "@mui/material/TextField";
import style from "./FormRegister.module.scss";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import cl from "classnames";
import FormControlLabel from "@mui/material/FormControlLabel";

const FormRegister = () => {

    const [password, setPassword] = useState('') //Инициализируем переменную состояни поля пароль
    const [passwordTrue, setPasswordTrue] = useState('')//Инициализируем переменную состояни поля повторите пароль

    const [passwordEqual, setPasswordEqual] = useState(true)

    //Функции обратного связывания для полей паролей
    const changePassword = (event: any) => {
        setPassword(event.target.value)
    }

    const changePasswordTrue = (event: any) => {
        setPasswordTrue(event.target.value)
    }

    useEffect(() => {
        setPasswordEqual(password !== passwordTrue)
    })

    return (
        <form className={style.form}>
            <Box
                component="form"
                sx={{
                    minWidth: '280px',
                    width: '100%',
                    display: 'flex',
                    flexGrow: 1,
                    gap: '16px',
                    flexDirection: 'column'
                }}
                noValidate
                className={style.form}
                autoComplete="off"
            >
                <FormGroup>
                    <TextField
                        id="name"
                        label="Имя"
                        variant="standard"
                        fullWidth={true}
                        className={style.input}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        id="phone"
                        type='phone'
                        label="Телефон"
                        variant="standard"
                        fullWidth={true}
                        className={style.input}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        id="email"
                        type='email'
                        label="E-mail"
                        variant="standard"
                        fullWidth={true}
                        className={style.input}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        id="password"
                        type='password'
                        label="Пароль"
                        variant="standard"
                        fullWidth={true}
                        value={password}
                        className={style.input}
                        onChange={changePassword}
                        error={passwordEqual}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        id="password_true"
                        type='password'
                        label="Повторите пароль"
                        variant="standard"
                        fullWidth={true}
                        value={passwordTrue}
                        onChange={changePasswordTrue}
                        className={style.input}
                        error={passwordEqual}
                        helperText={passwordEqual ? "Пароли не совпадают" : false}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked/>}
                        label="Я принимаю условия пользовательского соглашения"
                        className={cl(style.input)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button variant="contained"
                            size={'large'}
                            component="span"
                            className={style.button}
                    >
                        Зарегистрироваться
                    </Button>
                </FormGroup>
            </Box>
        </form>
    );
};

export default FormRegister;