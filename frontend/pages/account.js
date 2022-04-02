import {useAuth} from "../context/auth";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import backend from "../backend/clientWp";
import {useEffect, useState} from "react";
import CatalogListAccount from "../components/Catalog/CatalogListAccount";
import axios from "axios";

const Account = ({posts}) => {
    const {user, login, logout} = useAuth();
    const router = useRouter()
    const [myPosts, setMyPosts] = useState()

    useEffect(() => {

        if (user) {
            const userPosts = posts.filter((post) => {
                return post.acf?.users?.find((userFind) => {
                    return user.uid === userFind.uid
                })
            })
            setMyPosts(userPosts)
        }
    }, [user])

    return (
        <div>
            <div className={'body-pallet'}>
                <h2 className={'mb-32'}>Личный кабинет</h2>
                <div>
                    {
                        myPosts ? (<CatalogListAccount posts={myPosts} className={'mv-32'}/>) :
                        (<div>Здесь пока ничего нет</div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Account;

export async function getStaticProps(context) {
    const posts = await backend.programs()

    return {
        props: {
            posts
        },
    }
}