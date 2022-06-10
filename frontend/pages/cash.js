import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import {FormGroup} from '@mui/material';
import Button from "@mui/material/Button";
import API from '../utils/api'

const Cash = () => {

    const [numberCard, setNumberCard] = useState(0)
    const [dataCard, setDataCard] = useState({})
    const [notValid, setNotValid] = useState()

    const getDataCard = async () => {
        const response = (await API.get('ommo/v2/get_user_card_by_number', {
            params: {
                number: numberCard
            }
        })).data

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
            <h1>Касса</h1>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={'inline-fields'}>
                        <TextField
                            type={'number'}
                            value={numberCard}
                            variant={'standard'}
                            className={'w60'}
                            label={'Номер карты'}
                            error={notValid}
                            helperText={notValid ? 'Неправильный номер карты' : null}
                            onChange={event => setNumberCard(event?.target.value)}
                        />
                        <div className={'w20'}>
                            Всего баллов: <br/>
                            <h4>{dataCard?.acf?.scores ?? 0}</h4>
                        </div>
                        <div className={'w20'}>
                            Уровень: <br/>
                            <h4>{dataCard?.acf?.level ?? 0}</h4>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} className={'cash-fields'}>
                    <br/>
                    <h4>Зачисление бонусов</h4>
                    <FormGroup>
                        <TextField variant={'standard'} label={'Сумма покупки'}/>
                    </FormGroup>
                    <FormGroup>
                        <TextField variant={'standard'} label={'Кол-во бонусов'}/>
                    </FormGroup>
                    <div className={'cash-fields__footer'}>
                        <Button variant="contained"
                                size={'large'}
                                component="button"
                        > Зачислить
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} className={'cash-fields'}>
                    <br/>
                    <h4>Списание бонусов</h4>
                    <FormGroup>
                        <TextField variant={'standard'} label={'Сумма покупки'}/>
                    </FormGroup>
                    <FormGroup>
                        <TextField variant={'standard'} label={'Сколько списать баллов'}/>
                    </FormGroup>
                    <FormGroup>
                        <TextField variant={'standard'} value={0 + ' ₽'} label={'Итоговая сумма'}/>
                    </FormGroup>
                    <div className={'cash-fields__footer'}>
                        <Button variant="contained"
                                size={'large'}
                                component="button"
                        > Списать
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Cash;