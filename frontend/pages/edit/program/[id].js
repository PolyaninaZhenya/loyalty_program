import React, {useRef, useState, useEffect} from "react";
import axios from "axios";
import {useAuth} from "../../../context/auth";
import NewProgram from '../../newProgram'

const EditProgram = ({program, card}) => {
    const [state, setState] = useState(
        {
            program,
            card
        }
    )
    const {user} = useAuth()
    console.log(state)

    return (
        <>
            <NewProgram title={'Редактировать программу'} data={state}/>
        </>
    );
};

export default EditProgram;

export async function getServerSideProps({params}) {
    const response = await axios.get(`http://admin.ommo.loc/wp-json/ommo/v2/programInfo`, {
            params: {
                programId: params.id
            }
        })

    return {
        props: {
            program: response.data?.program,
            card: response.data?.card
        },
    }
}