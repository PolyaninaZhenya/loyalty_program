import style from "./SectionAbout.module.scss"
import Grid from "@mui/material/Grid";
import cl from "classname"

const SectionAbout = (props) => {
    const {
        className
    } = props

    const mainClasses = cl(
        className,
        'body-pallet'
    )

    return (
        <div className={mainClasses}>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6} className={style.image}>

                </Grid>
                <Grid item xs={12} lg={6} className={style.body}>
                    <h2 className={style.title}>О нас</h2>
                    <p>
                        Компания NameCompany (ООО) — динамично развивающийся участник рынка металлопроката с 2015 года.
                    </p>
                    <p>
                        За время работы мы выработали основные принципы, которым придерживаемся:
                        честные цены на металлопрокат
                        прозрачная система бонусов
                        различные формы оплаты, рассрочка платежа
                        доставка или самовывоз по заявке
                        профессиональная консультация и всесторонняя помощь в подборе
                    </p>
                </Grid>
            </Grid>
        </div>
    );
};

export default SectionAbout;