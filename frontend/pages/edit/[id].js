import React, {useRef, useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from "../../context/auth";
import NewProgram from '../newProgram'
import API from "../../utils/api";
import backend from "../../backend/clientWp";
import {useRouter} from "next/router";
import SectionBlocked from "../../components/Sections/SectionBlocked/SectionBlocked";
import SectionLoading from "../../components/Sections/SectionLoading/SectionLoading";
import SectionNotFound from "../../components/Sections/SectionNotFound/SectionNotFound";

const EditProgram = ({post, vendor, error}) => {
    const {user} = useAuth()
    const [acsess, setAcsess] = useState(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
        if (user && vendor) {
            setAcsess(user.uid === vendor.acf.uid)
            setLoading(false)
        }
    }, [user])

    if (!post)
        return <SectionNotFound message={'такой карты нет'}/>
    else
    return (
        <>
            {
                loading && !acsess ? <SectionLoading/> :
                    acsess ? <NewProgram title={'Редактировать программу'} data={post} vendor={vendor}/> :
                        <SectionBlocked/>
            }
        </>
    );
};

export default EditProgram;

export async function getServerSideProps({params}) {
    try {
        const post = await backend.card().id(params.id)
        const vendor = await backend.vendor().id(post.acf.vendor_id)

        return {
            props: {
                post,
                vendor
            },
        }
    } catch (e) {
        return {
            props: {
                error: e
            },
        }
    }


}