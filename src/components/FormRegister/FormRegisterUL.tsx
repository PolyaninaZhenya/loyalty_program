import TextField from "@mui/material/TextField";
import style from "./FormRegister.module.scss";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, {ChangeEvent, ChangeEventHandler, SyntheticEvent, useEffect, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import cl from "classnames";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from '@mui/material/Grid';

const FormRegisterUL = () => {

    const [password, setPassword] = useState('') //Инициализируем переменную состояни поля пароль
    const [passwordTrue, setPasswordTrue] = useState('')//Инициализируем переменную состояни поля повторите пароль

    const [passwordEqual, setPasswordEqual] = useState(true)

    //Функции обратного связывания для полей паролей
    const changePasword = (event: any) => {
        setPassword(event.target.value)
    }

    const changePasswordTrue = (event: any) => {
        setPasswordTrue(event.target.value)
    }

    useEffect(() => {
        setPasswordEqual(password !== passwordTrue)
        console.log(password, passwordTrue)
    })

    return (
        <form className={style.form}>

            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Box
                        component="form"
                        sx={{
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
                                error={passwordEqual}
                                value={password}
                                onChange={changePasword}
                                label="Пароль"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                error={passwordEqual}
                                helperText={passwordEqual ? "Пароли не совпадают" : false}
                                id="password_true"
                                type='password'
                                label="Повторите пароль"
                                value={passwordTrue}
                                onChange={changePasswordTrue}
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                            />
                        </FormGroup>

                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        component="form"
                        sx={{
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
                                id="company_name"
                                name="company_name"
                                label="Нименование компании"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id="company_address"
                                label="Юридический адрес"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id="company_fact_address"
                                label="Фактический адрес"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id="company_inn"
                                label="ИНН"
                                type="number"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                                id="company_ogrn"
                                label="ОГРН/ОГРНИП"
                                type="number"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                            />
                        </FormGroup>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup style={{marginBottom: '16px'}}>
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
                </Grid>
            </Grid>
        </form>
    );
};

export default FormRegisterUL;