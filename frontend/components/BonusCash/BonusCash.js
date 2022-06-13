import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {FormGroup} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const BonusCash = ({program, card, createPayment, update}) => {
    const [initBonus, setInitBonus] = useState(0)
    const [offBonus, setOffBonus] = useState(0)
    const [percent, setPercent] = useState(0)
    const [summaPayment, setSummaPayment] = useState()
    const [summaOff, setSummaOff] = useState(0)

    const handlerSummaPayment = (event) => {
        setSummaPayment(event.target.value)
    }

    const handlerSummaOff = (event) => {
        setSummaOff(event.target.value)
    }

    const handlerOffBonuses = (event) => {

        let max = 0
        if (+event.target.value > +card.acf.scores) {
            max = +card.acf.scores
        } else {
            max = +event.target.value
        }

        setOffBonus(max)
    }

    const addBonuses = () => {
        createPayment(summaPayment, card.acf.uid, card.acf.number, initBonus)
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {

            })

        update()
    }
    const offBonuses = () => {
        createPayment(summaOff, card.acf.uid, card.acf.number, -(+offBonus))
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
            .finally(() => {

            })

        update()
    }


    useEffect(() => {
        if (program?.acf?.levels && card?.acf?.level) {
            program.acf.levels.map((level) => {
                if (level?.id === card.acf.level) {
                    setPercent(+level.percent)
                }
            })

            setInitBonus(0)
        }
    }, [])

    useEffect(() => {
        if (program?.acf?.levels && card?.acf?.level) {
            program.acf.levels.map((level) => {
                if (level?.id === card.acf.level) {
                    setPercent(+level.percent)
                }
            })
            setInitBonus(Math.round(summaPayment * (percent / 100)))
        }
    }, [summaPayment])

    return (
        <>
            <Grid item xs={12}>
                Всего бонусов: <br/>
                <h4>{card?.acf?.scores}</h4>
            </Grid>
            <Grid item xs={12} md={6} className={'cash-fields'}>
                <br/>
                <h4>Зачисление бонусов</h4>
                <FormGroup>
                    <TextField
                        variant={'standard'}
                        value={summaPayment ?? 0}
                        type={'number'}
                        label={'Сумма покупки'}
                        onChange={handlerSummaPayment}
                    />
                </FormGroup>
                <div className={'w20'}>
                    Будет начислено бонусов: <br/>
                    <h4>{initBonus}</h4>
                </div>
                <div className={'cash-fields__footer'}>
                    <Button variant="contained"
                            size={'large'}
                            component="button"
                            onClick={addBonuses}
                    > Зачислить
                    </Button>
                </div>
            </Grid>
            <Grid item xs={12} md={6} className={'cash-fields'}>
                <br/>
                <h4>Списание бонусов</h4>
                <FormGroup>
                    <TextField
                        variant={'standard'}
                        label={'Сумма покупки'}
                        value={summaOff}
                        onChange={handlerSummaOff}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        variant={'standard'}
                        label={'Сколько списать баллов'}
                        value={offBonus}
                        type={'number'}
                        onChange={handlerOffBonuses}
                    />
                </FormGroup>
                <FormGroup>
                    <TextField
                        variant={'standard'}
                        value={summaOff - offBonus + ' ₽'}
                        label={'Покупатель должен заплатить'}/>
                </FormGroup>
                <div className={'cash-fields__footer'}>
                    <Button variant="contained"
                            size={'large'}
                            component="button"
                            onClick={offBonuses}
                    > Списать
                    </Button>
                </div>
            </Grid>
        </>
    );
};

export default BonusCash;