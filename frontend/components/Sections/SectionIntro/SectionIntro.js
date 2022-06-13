import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import style from './sectionintro.module.scss'

const SectionIntro = () => {
    return (
        <div className={'body-pallet'}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={7} className={style.body}>
                    <h1 className={style.title}>OMMO сокращение расходов</h1>
                    <div className={style.text}>Воспользуйтесь нашим сервисом искоратите сумму затрат на создание программы лояльности до 50%</div>
                    <Button variant="contained" className={'my-button__primary'}>оставить заявку</Button>
                </Grid>
                <Grid item xs={12} lg={5} className={style.image}>

                </Grid>
            </Grid>
        </div>
    );
};

export default SectionIntro;