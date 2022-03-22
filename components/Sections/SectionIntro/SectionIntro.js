import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import style from './sectionintro.module.scss'

const SectionIntro = () => {
    return (
        <div className={'body-pallet'}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6} className={style.body}>
                    <h1 className={style.title}>Что-то интересное для Вас</h1>
                    <div className={style.text}>Описание оффера, которое привлечет новых пользователей в данное приложение. Очень вкусное и заманчивое предложение!</div>
                    <Button variant="contained" className={'my-button__primary'}>оставить заявку</Button>
                </Grid>
                <Grid item xs={12} lg={6} className={style.image}>

                </Grid>
            </Grid>
        </div>
    );
};

export default SectionIntro;