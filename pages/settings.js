import {useAuth} from "../context/auth";
import {useRouter} from "next/router";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import React, {useState} from "react";
import style from "../components/FormLogin/FormLogin.module.scss";
import Button from "@mui/material/Button";

const Settings = () => {
    const {user, login, logout} = useAuth()
    const [isEdit, setIsEdit] = useState(false)

    return (
        <div>
            <div className={'body-pallet'}>
                <h1>Настройки</h1>
                {
                    user && <>
                        <small>Последний раз вы заходили: {user.reloadUserInfo.lastRefreshAt}</small><br/>
                        <small>Зарегистрирован через: {user.providerData[0].providerId}</small>
                        <form id={'edit-form'}>
                            <table className={'table-settings'}>
                                <tbody>
                                <tr>
                                    <td>Имя:</td>
                                    <td>
                                        <FormGroup>
                                            <TextField
                                                id="username"
                                                variant="standard"
                                                fullWidth={true}
                                                disabled={!isEdit}
                                                value={user?.displayName}
                                            />
                                        </FormGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>
                                        <FormGroup>
                                            <TextField
                                                id="username"
                                                variant="standard"
                                                type={'email'}
                                                fullWidth={true}
                                                disabled={!isEdit}
                                                value={user?.email}
                                            />
                                        </FormGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Номер:</td>
                                    <td>
                                        <FormGroup>
                                            <TextField
                                                id="username"
                                                variant="standard"
                                                type={'tel'}
                                                fullWidth={true}
                                                disabled={!isEdit}
                                                value={user?.phoneNumber}
                                            />
                                        </FormGroup>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                        <div className={'table-settings__footer'}>
                            {
                                isEdit ?
                                    (<Button variant="contained"
                                             size={'large'}
                                             component="span"
                                             type={'submit'}
                                             form={'edit-form'}
                                             className={style.button}
                                             onClick={() => setIsEdit(false)}
                                    >
                                        Сохранить
                                    </Button>)
                                    : (<Button variant="contained"
                                               size={'large'}
                                               component="span"
                                               className={style.button}
                                               onClick={() => setIsEdit(true)}
                                    >
                                        Редактировать
                                    </Button>)
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default Settings;

export async function getStaticProps(context) {
    return {
        props: {},
    }
}