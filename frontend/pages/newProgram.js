import TextField from "@mui/material/TextField";
import style from "../components/FormLogin/FormLogin.module.scss";
import FormGroup from "@mui/material/FormGroup";
import React from "react";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const NewProgram = () => {

    const [age, setAge] = React.useState('Условие');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className={'body-pallet'}>
            <h1>Добавить программу</h1><br/>
            <form>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <h4>Описание</h4>
                        <FormGroup>
                            <TextField
                                id="program_name"
                                label="Название"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                            />
                            <br/>
                            <TextField
                                id="program_description"
                                label="Описание"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                            />
                            <br/>
                            <TextField
                                id="program_type"
                                label="Тип программы"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h4>Уровни</h4>
                        <FormGroup style={{display: 'flex'}}>
                            <TextField
                                id="program_level_percent"
                                label="%"
                                variant="standard"
                                type={'number'}
                                className={style.input}
                                style={{maxWidth: '60px'}}
                            />
                        </FormGroup>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Параметр</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={age}
                                onChange={handleChange}
                                label="Условие"
                            >
                                <MenuItem value={10}>Сумма сех покупок</MenuItem>
                                <MenuItem value={20}>Время владения</MenuItem>
                                <MenuItem value={30}>Сумма покупок в месяц</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple">Условие</InputLabel>
                            <Select
                                labelId="demo-simple"
                                id="if"
                                value={age}
                                onChange={handleChange}
                                label="Условие"
                            >
                                <MenuItem value={10}>Больше</MenuItem>
                                <MenuItem value={20}>Меньше</MenuItem>
                                <MenuItem value={30}>Равно</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            id="program_level_if_1"
                            label="Число"
                            variant="standard"
                            type={'number'}
                            className={style.input}
                            style={{maxWidth: '60px'}}
                        />
                        <br/>
                        <Button variant="contained"
                                size={'large'}
                                component="span"
                                className={style.button}
                        >
                            Добавить
                        </Button>
                    </Grid>
                </Grid>
                <br/>
                <Button variant="contained"
                        size={'large'}
                        component="span"
                        className={style.button}
                >
                    Создать
                </Button>
            </form>
        </div>
    );
};

export default NewProgram;