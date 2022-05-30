import TextField from "@mui/material/TextField";
import style from "./FormRegister.module.scss";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import cl from "classnames";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useAuth} from "../../context/auth";

const FormRegister = () => {

    // Переменные состояния паролей
    const [password, setPassword] = useState('') //Инициализируем переменную состояни поля пароль
    const [passwordTrue, setPasswordTrue] = useState('')//Инициализируем переменную состояни поля повторите пароль
    const [passwordEqual, setPasswordEqual] = useState(true)

    const {user, login, logout, register, loading, error} = useAuth();

    const [userName, setUserName] = useState(null)
    const [userPhone, setUserPhone] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [userApply, setUserApply] = useState(false)

    //Функции обратного связывания для полей паролей
    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const changePasswordTrue = (event) => {
        setPasswordTrue(event.target.value)
    }

    const changeUserName = (event) => {
        setUserName(event.target.value)
    }

    const changeUserPhone = (event) => {
        setUserPhone(event.target.value)
    }
    const changeUserEmail = (event) => {
        setUserEmail(event.target.value)
    }
    const changeUserApply = (event) => {
        setUserApply(!userApply)
    }

    console.log(error)

    useEffect(() => {
        setPasswordEqual(password !== passwordTrue)
    })

    console.log(error)

    const onSubmitForm = (event) => {
        event.preventDefault()
        console.log('Запустил скрипт')
        console.log({
            userName,userEmail,userPhone,password,passwordEqual,userApply
        })
        if(userName && userEmail && userPhone && password && !passwordEqual && userApply){
            console.log('Проверка пройдена')
            register(userEmail, userName, password)
        } else {
            console.log('Проверка не пройдена')
        }
    }

    return (
        <div className={style.form} >
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
                        value={userName}
                        onChange={changeUserName}
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
                        value={userPhone}
                        onChange={changeUserPhone}
                        className={style.input}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        id="email"
                        type='email'
                        label="E-mail"
                        variant="standard"
                        value={userEmail}
                        onChange={changeUserEmail}
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
                        control={<Checkbox checked={userApply} onChange={changeUserApply}/>}
                        label="Я принимаю условия пользовательского соглашения"
                        className={cl(style.input)}
                    />
                </FormGroup>
                <FormGroup>
                    <Button variant="contained"
                            size={'large'}
                            component="span"
                            onClick={onSubmitForm}
                            className={style.button}
                    >Зарегистрироваться
                    </Button>
                </FormGroup>
            </Box>
        </div>
    );
};

export default FormRegister;