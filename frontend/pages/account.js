import {useAuth} from "../context/auth";
import {useEffect, useState} from "react";
import CatalogListAccount from "../components/Catalog/CatalogListAccount";
import API from "../utils/api";
import nookies from 'nookies';

const Account = () => {
    const {user} = useAuth()
    const [posts, setPosts] = useState()

    const fetchData = async (user) => {
        const result = await API.get(`ommo/v2/get_user_cards`, {
            params: {
                uid: user.uid
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

export async function getServerSideProps(context) {
    console.log('Контекст:', context.params)
    return {
        props: { message: `Next.js is awesome` }, // will be passed to the page component as props
    }
}