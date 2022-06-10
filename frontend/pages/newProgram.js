import TextField from "@mui/material/TextField";
import style from "../components/FormLogin/FormLogin.module.scss";
import FormGroup from "@mui/material/FormGroup";
import React, {useEffect, useRef, useState} from "react";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {CSSTransition, TransitionGroup,} from 'react-transition-group';
import {useAuth} from "../context/auth";
import API from "../utils/api";

const NewProgram = ({title, data, vendor}) => {
    const fileInput = useRef()
    const {user} = useAuth()
    const [saving, setSaving] = useState({})
    const [post, setPost] = useState(data ? {...data} : {
        title: {
            rendered: ""
        },
        content: {
            rendered: "",
            protected: false
        },
        cat_card: [4],
        acf: {
            vendor_id: null,
            levels: [
                {
                    id: 1,
                    percent: 0,
                    parameter: "summa",
                    condition: ">",
                    value: 100
                },
            ]
        }
    })

    console.log(post)

    const [programTypes, setProgramTypes] = useState([
        {
            id: 4,
            value: 'Бонусная'
        },
        {
            id: 7,
            value: 'Скидочная'
        },
    ])

    //Изменяем данные уровня
    const changeLevels = (id, field, value) => {
        let newData = post.acf.levels

        newData.forEach((level) => {
            if (level.id === id) {
                level[field] = `${value}`
            }
        })

        setPost({...post, acf: {levels: [...newData]}})
    }

    function cutTegs(str) {
        return str.replace(/<\/?[^>]+(>|$)/gi, "").replace(/& nbsp;/gi,' ');
    }

    //Добавляем новый уровень
    const addLevel = () => {
        let dataLevel = post.acf.levels

        dataLevel.push({
            id: (post.acf.levels[post.acf.levels.length - 1].id + 1),
            percent: 0,
            condition: '>',
            parameter: 'summa',
            value: 0,
        })

        setPost({...post, acf: {levels: [...dataLevel]}})
    }

    const removeLevel = (id) => {
        const newData = post.acf.levels.filter((item) => {
            return item.id !== id
        })

        setPost({...post, acf: {levels: [...newData]}})
    }

    const handlerSubmitForm = async (event) => {
        event.preventDefault();

        const params = {
            post,
            user
        }

        try {
            if (data) {
                const response = await API.post('ommo/v2/edit_program', {
                    ...params
                })
                setSaving({...response})
                console.log(response)
            } else {
                const response = await API.post('ommo/v2/create_program', {
                    ...params
                })
            }

        } catch (error) {
            setSaving({...error})
            console.log(error.response)
        }
    }

    console.log(saving)

    const handleInputFile = () => {
        // if (fileInput.current?.files[0]) {
        //     setFiles(fileInput.current.files[0])
        // }
    }

    return (
        <div className={'body-pallet'}>
            <h1>{title ? title : 'Добавить программу' }</h1>
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
                                value={cutTegs(post.title.rendered)}
                                onChange={event => setPost({...post, title: {rendered: event.target.value}})}
                                fullWidth={true}
                                className={style.input}
                            />
                            <br/>
                            <TextField
                                id="program_description"
                                name="program_description"
                                value={cutTegs(post.content.rendered)}
                                onChange={event => setPost({...post, content: {rendered: event.target.value}})}
                                label="Описание"
                                variant="standard"
                                fullWidth={true}
                                className={style.input}
                                placeholder={'Описание'}
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
                                    value={post.cat_card[0]}
                                    onChange={e => setPost({...post, cat_card: [e.target.value]})}
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
                        <input type={'file'} ref={fileInput} onChange={handleInputFile}/>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <h4>Уровни</h4>
                        <br/>
                        <TransitionGroup className="todo-list">
                            {
                                post?.acf?.levels?.map(item => (
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
                                        }} >
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
                                                X
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
                    {post ? 'Сохранить' : 'Создать'}
                </Button>
                {saving?.data && <span style={{color: saving.status === 200 ? 'green' : 'red'}}> {saving.data.message}</span>}
            </form>
        </div>
    );
};

export default NewProgram;