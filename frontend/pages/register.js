import React from 'react';
import FormRegister from "../components/FormRegister/FormRegister";
import {useAuth} from "../context/auth";

const Register = () => {
    const {user, login, logout} = useAuth();

    return (
        <div className={'row row_login'}>
            <div className={'body-pallet page-login'}>
                <div className={'title title-h3'}>Регистрация</div>
                <FormRegister/>
                <div className={'mv-8'}><small>или войдите с помощью</small></div>
                <div>
                    <button onClick={login}>google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;