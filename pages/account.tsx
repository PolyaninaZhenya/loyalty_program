import type { NextPage } from 'next'
import {useAuth} from "../src/context/auth";

const Account: NextPage = () => {
    const {user, login, logout} = useAuth();

    return (
        <div>
            <h1>Личный кабинет</h1>
            <div>
                <img src={user?.photoURL} alt="" style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: "1px solid var(--color-primary)",
                    marginRight: "10px",
                    float: "left"
                }}/>
                <h2>{user?.displayName}</h2>

                {user && <button onClick={logout}>Выйти</button>}
                {!user && <button onClick={login}>Войти</button>}
            </div>


        </div>
    )
}

export default Account
