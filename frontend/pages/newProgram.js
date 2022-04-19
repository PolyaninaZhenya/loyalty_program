import TextField from "@mui/material/TextField";
import style from "../components/FormLogin/FormLogin.module.scss";
import FormGroup from "@mui/material/FormGroup";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';

const NewProgram = () => {
    const [age, setAge] = React.useState('Условие');

    const [programName, setProgramName] = useState()
    const [programDesc, setProgramDesc] = useState()
    const [programType, setProgramType] = useState()

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const serializeFormData = (form) => {
        const formData = new FormData(form);
        const serialized = {};
        formData.forEach((v, k) => {
            if (serialized[k]) {
                let ram = serialized[k]
                if (!Array.isArray(serialized[k])) {
                    serialized[k] = []
                    serialized[k].push(ram)
                }
                serialized[k].push(v)
            } else {
                serialized[k] = v;
            }
        });
        return serialized;
    }

    const createProgram = async (event) => {
        event.preventDefault()
        console.log(programName, programDesc, programType)
    }

    return (
        <div className={'body-pallet'}>
            <h1>Добавить программу</h1><br/>
            <form onSubmit={(event) => {
                createProgram(event)
            }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <h4>Описание</h4>
                        <FormGroup>
                            <TextField
                                id="program_name"
                                label="Название"
                                variant="standard"
                                value={programName}
                                onChange={event => setProgramName(event.target.value)}
                                fullWidth={true}
                                className={style.input}
                            />
                            <br/>
                            <TextField
                                id="program_description"
                                value={programDesc}
                                onChange={event => setProgramDesc(event.target.value)}
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
                                value={programType}
                                onChange={event => setProgramType(event.target.value)}
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
                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
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
                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
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
                        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                        <TextField
                            id="program_level_if_1"
                            label="Число"
                            variant="standard"
                            type={'number'}
                            className={style.input}
                            style={{maxWidth: '60px'}}
                        />
                        </FormControl>
                        <br/>
                        <Button variant="contained"
                                size={'large'}
                                component="span"
                                className={style.button}
                        >
                            Добавить уровень
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h4>Карта</h4><br/>
                        <FormGroup>
                            <TextField
                                id="program_card_name"
                                label="Название карты"
                                variant="standard"
                                className={style.input}
                            /><br/>
                            <TextField
                                id="program_card_desc"
                                label="Описание"
                                variant="standard"
                                className={style.input}
                            />
                        </FormGroup>
                        <br/>
                        <Input type={'file'}/>
                    </Grid>
                </Grid>
                <br/>
                <Button variant="contained"
                        size={'large'}
                        component="button"
                        type={'submit'}
                        className={style.button}
                >
                    Создать
                </Button>
            </form>
        </div>
    );
};

export default NewProgram;