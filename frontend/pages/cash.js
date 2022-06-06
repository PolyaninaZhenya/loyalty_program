import React from 'react';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import {FormGroup} from '@mui/material';
import Button from "@mui/material/Button";

const Cash = () => {
    return (
        <div className={'body-pallet'}>
            <h1>Касса</h1>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={'inline-fields'}>
                        <TextField variant={'standard'} className={'w80'} label={'Номер карты'}/>
                        <TextField variant={'standard'} className={'w20'} value={'0'} label={'Всего баллов'} disabled/>
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