import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {useAuth} from "../context/auth";
import API from "../utils/api";
import TextField from '@mui/material/TextField';
import {FormGroup} from '@mui/material';
import Image from 'next/image'

const Organization = () => {
    const {user} = useAuth()

    const getVendor = async (id) => {
        const vendor = (await API.get(`ommo/v2/get_vendor`, {
            params: {
                id: id
            }
        })).data

        const posts = (await API.get(`ommo/v2/get_vendor_card`, {
            params: {
                id: vendor.id
            }
        })).data

        return {
            vendor,
            posts,
        }
    }

    const [vendor, setVendor] = useState()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (user) {
            getVendor(user.uid)
                .then((res) => {
                console.log(res)
                setVendor({...vendor, ...res.vendor})
                setPosts(res.posts)
                console.log(posts)
            })
                .catch(e => {
                    console.log(e)
                })
        }
    }, [])


    return (
        <div>
            <div className={'body-pallet'}>
                <h2 className={'mb-32'}>Кабинет организации</h2>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <h4>Данные организации</h4>
                        <br/>
                        {
                            vendor &&
                            <div className={'form-gap'}>
                                <FormGroup>
                                    <TextField label="Название организации" variant="standard" value={vendor.title}/>
                                </FormGroup>
                                <FormGroup>
                                    <TextField label="Юр. Название" variant="standard" value={vendor.guide.ur_name}/>
                                </FormGroup>
                                <FormGroup>
                                    <TextField label="Юр. Адрес" variant="standard" value={vendor.guide.ur_address}/>
                                </FormGroup>
                                <FormGroup>
                                    <TextField label="Фак. Адрес" variant="standard" value={vendor.guide.fact_address}/>
                                </FormGroup>
                                <FormGroup>
                                    <TextField label="ИНН" type={'number'} variant="standard" value={vendor.guide.inn}/>
                                </FormGroup>
                                <FormGroup>
                                    <TextField label="КПП" type={'number'} variant="standard" value={vendor.guide.kpp}/>
                                </FormGroup>
                                <FormGroup>
                                    <TextField label="ОГРН" type={'number'} variant="standard"
                                               value={vendor.guide.ogrn}/>
                                </FormGroup>
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        {
                            vendor &&
                            <div className={'form-gap'}>
                                <h4>Банк</h4>
                                <FormGroup>
                                    <TextField label="Бик" type={'number'} variant="standard" value={vendor.guide.bik}/>
                                </FormGroup>
                                <FormGroup>
                                    <TextField label="Расчетный счет" type={'number'} variant="standard"
                                               value={vendor.guide.payment_account}/>
                                </FormGroup>
                                <FormGroup>
                                    <TextField label="Кор. счет" type={'number'} variant="standard"
                                               value={vendor.guide.cor_account}/>
                                </FormGroup>
                            </div>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <br/>
                        <h4>Зарегистрированные карточки</h4>
                        <br/>
                        {
                            posts &&
                            <table className={'table-cards'}>
                                <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Изображение</th>
                                    <th>Название</th>
                                    <th>Действие</th>
                                </tr>
                                { posts.map((post) => (
                                    <tr>
                                        <td>{post?.ID}</td>
                                        <td><div className="table-cards__img">
                                            <Image src={post.main_image?.sizes.medium} alt="" layout={'fill'} objectFit={'cover'}/>
                                        </div></td>
                                        <td>{post.post_title}</td>
                                        <td><a href="#">Редактировать</a></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Organization;

export async function getServerSideProps(context) {

    return {
        props: {},
    }
}