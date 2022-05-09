import TextField from "@mui/material/TextField";
import style from "../components/FormLogin/FormLogin.module.scss";
import FormGroup from "@mui/material/FormGroup";
import React, {useRef, useState} from "react";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import {Label} from "@mui/icons-material";
import axios from "axios";
import {useAuth} from "../context/auth";

const NewProgram = ({title, data}) => {
    const [programName, setProgramName] = useState(data?.program?.post_title ?? '')
    const [programDesc, setProgramDesc] = useState(data?.program?.post_content ?? '')
    const [programType, setProgramType] = useState(data?.program?.post_content ?? '')
    const [cardName, setCardName] = useState(data?.card?.post_title ?? '')
    const [cardDesc, setCardDesc] = useState(data?.card?.post_content ?? '')
    const [files, setFiles] = useState([])
    const fileInput = useRef()
    const {user} = useAuth()

    const [levels, setLevels] = useState(data?.program?.acf?.levels ?? [{
        id: 1,
        percent: 0,
        condition: '>',
        parameter: 'summa',
        value: 0
    }])

    const [programTypes, setProgramTypes] = useState([
        {
            id: 5,
            value: 'Бонусная'
        },
        {
            id: 6,
            value: 'Скидочная'
        },
    ])


    //Изменяем данные уровня
    const changeLevels = (id, field, value) => {
        let newData = levels
        newData.forEach((level) => {
            if (level.id === id) {
                level[field] = `${value}`
            }
        })

        setLevels([...newData])
    }

    //Добавляем новый уровень
    const addLevel = () => {
        let data
        if (levels.length) {
            data = {
                id: (levels[levels.length - 1].id + 1),
                percent: 0,
                condition: '>',
                parameter: 'summa',
                value: 0,
            }
        } else {
            data = {
                id: 0,
                percent: 0,
                condition: '>',
                parameter: 'summa',
                value: 0,
            }
        }

        setLevels(arr => [...arr, data])
    }

    const handleFileSelected = (e) => {
        const newFiles = Array.from(e.target.files)
        setFiles([...newFiles])
    }

    const removeLevel = (id) => {
        const newData = levels.filter((item) => {
            return item.id !== id
        })

        setLevels(newData)
    }

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

    const handlerSubmitForm = async (event) => {
        event.preventDefault();

        const params = {
            cardId: data?.card?.ID,
            cardName,
            cardDesc,
            programId: data?.program?.ID,
            programType,
            programDesc,
            programName,
            levels,
            user
        }

        try {
            if (data) {
                console.log('Сохраняем', params)
                const response = await axios.put('http://admin.ommo.loc/wp-json/ommo/v2/edit_program', {
                    params: {
                        cardId: data?.card?.ID,
                        cardName,
                        cardDesc,
                        programId: data?.program?.ID,
                        programType,
                        programDesc,
                        programName,
                        levels,
                        user
                    }
                })
                console.log(response)
            } else {
                console.log('Создаем', params)
                const response = await axios.post('http://admin.ommo.loc/wp-json/ommo/v2/create_program', {
                    params: {
                        cardName,
                        cardDesc,
                        programType,
                        programDesc,
                        programName,
                        levels,
                        user
                    }
                })
            }
        } catch (error) {
            console.log(error.response)
        }

    }

    return (
        <div className={'body-pallet'}>
            {
                title ? <h1>{title}</h1> : <h1>Добавить программу</h1>
            }
            <br/>
            <form onSubmit={handlerSubmitForm}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={5}>
                        <h4>Программа</h4><br/>
                        <FormGroup>
                            <TextField
                                id="program_name"
                                name="program_name"
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
                                name="program_description"
                                value={programDesc}
                                onChange={event => setProgramDesc(event.target.value)}
                                label="Описание"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                                placeholder={'Тип программы'}
                            />
                            <br/>
                            <FormGroup>
                                <InputLabel id={'program_type_label'}>
                                    Тип программы
                                </InputLabel>
                                <Select
                                    labelId={'program_type_label'}
                                    id={`program_type`}
                                    name={`program_type`}
                                    label="Условие"
                                    onChange={e => setProgramType(e.target.value)}
                                >
                                    {programTypes.map((item) => (
                                        <MenuItem value={item.id} key={item.id}>
                                            {item.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormGroup>
                        </FormGroup>
                        <br/>
                        <h4>Карта</h4><br/>
                        <FormGroup>
                            <TextField
                                id="program_card_name"
                                name="program_card_name"
                                label="Название карты"
                                variant="standard"
                                className={style.input}
                                value={cardName}
                                onChange={e => setCardName(e.target.value)}
                            /><br/>
                            <TextField
                                id="program_card_desc"
                                label="Описание"
                                variant="standard"
                                className={style.input}
                                value={cardDesc}
                                onChange={e => setCardDesc(e.target.value)}
                            />
                        </FormGroup>
                        <br/>
                        <Input type={'file'} ref={fileInput} onLoad={handleFileSelected}/>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <h4>Уровни</h4>
                        <br/>
                        <TransitionGroup className="todo-list">
                            {
                                levels?.map(item => (
                                    <CSSTransition
                                        key={item?.id}
                                        timeout={500}
                                        classNames="item"
                                    >
                                        <div style={{
                                            display: 'flex',
                                            gap: '16px',
                                            alignItems: 'flex-end',
                                            marginBottom: '16px'
                                        }}>
                                            <TextField
                                                id={`level_percent_${item?.id}`}
                                                label="% скидки"
                                                variant="standard"
                                                type={'number'}
                                                value={item?.percent}
                                                className={style.input}
                                                onChange={event => changeLevels(item?.id, 'percent', event.target.value)}
                                                style={{maxWidth: '70px'}}
                                            />
                                            <FormGroup>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id={`select-parameter_${item?.id}`}
                                                    value={item?.parameter}
                                                    style={{width: '200px'}}
                                                    onChange={event => changeLevels(item?.id, 'parameter', event.target.value)}
                                                    label="Условие"
                                                >
                                                    <MenuItem value={'summa'}>Сумма всех покупок</MenuItem>
                                                    <MenuItem value={'time'}>Время владения</MenuItem>
                                                    <MenuItem value={'summa_month'}>Сумма покупок в месяц</MenuItem>
                                                </Select>
                                            </FormGroup>
                                            <FormGroup>
                                                <Select
                                                    labelId="demo-simple"
                                                    id="if"
                                                    value={item?.condition}
                                                    onChange={event => changeLevels(item?.id, 'condition', event.target.value)}
                                                    label="Условие"
                                                >
                                                    <MenuItem value={'>'}>Больше</MenuItem>
                                                    <MenuItem value={'<'}>Меньше</MenuItem>
                                                    <MenuItem value={'='}>Равно</MenuItem>
                                                </Select>
                                            </FormGroup>
                                            <TextField
                                                id={`level_value_${item?.id}`}
                                                label="Число"
                                                variant="standard"
                                                type={'number'}
                                                value={item?.value}
                                                className={style.input}
                                                onChange={event => changeLevels(item?.id, 'value', event.target.value)}
                                                style={{maxWidth: '60px'}}
                                            />
                                            <span onClick={() => removeLevel(item?.id)} style={{cursor: 'pointer'}}>
                                        Удалить
                                    </span>
                                        </div>
                                    </CSSTransition>
                                ))
                            }
                        </TransitionGroup>
                        <br/>
                        <Button variant="contained"
                                size={'large'}
                                component="span"
                                className={style.button}
                                onClick={addLevel}
                        >
                            Добавить уровень
                        </Button>
                    </Grid>
                </Grid>
                <br/>
                <Button variant="contained"
                        size={'large'}
                        component="button"
                        type={'submit'}
                        className={style.button}
                >
                    {data ? 'Сохранить' : 'Создать'}
                </Button>
            </form>
        </div>
    );
};

export default NewProgram;