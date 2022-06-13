import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import {FormGroup} from '@mui/material';
import Button from "@mui/material/Button";
import API from '../utils/api'
import backend from "../backend/clientWp";
import BonusCash from "../components/BonusCash/BonusCash";
import SaleCash from "../components/SaleCash/SaleCash";

const Cash = () => {

    const [numberCard, setNumberCard] = useState(0)
    const [dataCard, setDataCard] = useState({})
    const [notValid, setNotValid] = useState()
    const [dataProgram, setDataProgram] = useState()

    const createPayment = async (summa, uid, number, bonuses = 0) => {
        return await API.post('ommo/v2/create_payment', {
            summa,
            uid,
            number,
            bonuses
        })
    }

    const getDataCard = async () => {
        const response = (await API.get('ommo/v2/get_user_card_by_number', {
            params: {
                number: numberCard
            }
        })).data

        if (response?.acf?.card_id) {
            const data = await backend.card().id(response?.acf?.card_id)
            setDataProgram(data)
        }

        if (response.ID) {
            setDataCard({...response})
            setNotValid(false)
        } else {
            setDataCard({})
            setNotValid(true)
        }
    }

    useEffect(() => {
        getDataCard()
    }, [numberCard])

    return (
        <div className={'body-pallet'}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h1>Касса</h1>
                <Button variant="contained"
                        size={'large'}
                        component="button"
                        onClick={getDataCard}
                > Обновить
                </Button>
            </div>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={'inline-fields'}>
                        <TextField
                            type={'number'}
                            value={numberCard}
                            variant={'standard'}
                            className={'w80'}
                            label={'Номер карты'}
                            error={notValid}
                            helperText={notValid ? 'Неправильный номер карты' : null}
                            onChange={event => setNumberCard(event?.target.value)}
                        />
                        <div className={'w20'}>
                            Уровень: <br/>
                            <h4>{dataCard?.acf?.level ?? 0}</h4>
                        </div>
                    </div>
                </Grid>
                {
                    dataCard && dataProgram && dataProgram?.cat_card[0] === 4 ?
                        <BonusCash
                            card={dataCard}
                            program={dataProgram}
                            createPayment={createPayment}
                            update={getDataCard}
                        /> :
                        <SaleCash
                            card={dataCard}
                            program={dataProgram}
                            createPayment={createPayment}
                            update={getDataCard}
                        />
                }
            </Grid>
        </div>
    );
};

export default Cash;