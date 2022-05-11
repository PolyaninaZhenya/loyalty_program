import {useAuth} from "../context/auth";
import {useEffect, useState} from "react";
import CatalogListAccount from "../components/Catalog/CatalogListAccount";
import axios from 'axios'

const Account = () => {
    const {user} = useAuth()
    const [posts, setPosts] = useState()

    const fetchData = async (user) => {
        const result = await axios.get(`http://admin.ommo.loc/wp-json/ommo/v2/get_user_card`, {
            params: {
                id: user.uid
            }
        })
        setPosts(result.data)
    }

    useEffect(() => {
        if (user) {
            fetchData(user)
        }
    }, [user])

    return (
        <div>
            <div className={'body-pallet'}>
                <h2 className={'mb-32'}>Личный кабинет</h2>
                <div>
                    {
                        posts ?
                            (<CatalogListAccount posts={posts} className={'mv-32'}/>) :
                            (<div>Здесь пока ничего нет</div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Account;