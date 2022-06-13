import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {FormGroup} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SaleCash = ({program, card, createPayment}) => {

    const [summaPayment, setSummaPayment] = useState(0)
    const [percent, setPercent] = useState(0)
    const [finishSum, setFinishSum] = useState(0)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(false)

    const handlerSummaPayment = (event) => {
        setSummaPayment(+event.target.value)
    }

    const onSubmitPayment = () => {
        setStatus(false)
        setLoading(true)
        createPayment(finishSum, card.acf.uid, card.acf.number)
            .then((res) => {
                console.log(res.data)
                setSummaPayment(0)
                setStatus(true)
            })
            .catch(e => {
                console.log(e)
            }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        if (program?.acf?.levels && card?.acf?.level) {
            program.acf.levels.map((level) => {
                if (level?.id === card.acf.level) {
                    setPercent(+level.percent)
                }
            })
        }

        setFinishSum(Math.round(summaPayment - summaPayment * (percent / 100)))
    }, [summaPayment])

    return (
        <>
            <Grid item xs={12}>
                <h4>Скидочная карта - Рассчитать скидку</h4>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <FormGroup>
                    <TextField
                        variant={'standard'}
                        type={'number'}
                        value={summaPayment ?? 0}
                        label={'Сумма покупки'}
                        onChange={handlerSummaPayment}
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={12} md={2} lg={2}>
                <FormGroup>
                    <TextField
                        variant={'standard'}
                        type={'number'}
                        value={percent ?? 0}
                        label={'Процент скидки'}
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={12} md={2} lg={2}>
                <FormGroup>
                    <TextField
                        variant={'standard'}
                        type={'number'}
                        value={finishSum ?? 0}
                        label={'Конечная сумма'}
                    />
                </FormGroup>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Button variant="contained"
                        size={'large'}
                        component="button"
                        disabled={!summaPayment}
                        onClick={onSubmitPayment}
                > Провести покупку
                </Button>
                {
                    status && <span style={{color: 'green'}}> Успешно</span>
                }
            </Grid>
        </>
    );
};

export default SaleCash;