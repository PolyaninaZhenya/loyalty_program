import {useAuth} from "../context/auth";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import CatalogItem from "../components/Catalog/CatalogItem/CatalogItem";
import backend from "../backend/clientWp";
import {useEffect, useState} from "react";

const Account = ({posts}) => {
    const {user, login, logout} = useAuth();
    const router = useRouter()
    const [myPosts, setMyPosts] = useState()

    const getImage = async (id) => {
        let buffer = await fetch(`http://fine02r4.beget.tech/wp-json/wp/v2/media?parent=${id}`)
        return await buffer.json()
    }


    useEffect(() => {
        if (user ) {
            const filterPosts = posts.filter((post) => {
                if (post.acf.users) {
                    return !!post.acf.users.find((item) => item.uid === user.uid);
                }
                return false;
            })
            if (filterPosts !== myPosts) {
                setMyPosts(filterPosts)
            }
        }
    })


    return (
        <div>
            <div className={'body-pallet'}>
                <h2>Личный кабинет</h2>
                <Grid container spacing={3}>
                    {
                        myPosts?.map((post) => (
                            <Grid item xs={12} lg={4} key={post.id}>
                                <CatalogItem post={post} image={getImage(post.id)}/>
                            </Grid>
                        ))
                    }
                </Grid>
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