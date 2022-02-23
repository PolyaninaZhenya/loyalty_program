import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FC} from "react";
import Grid from '@mui/material/Grid';

const TariffItem: FC<any> = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="/tariff1.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Первый тариф
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Небольшое описание тарифа его цены и других характеристик
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="/tariff1.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Второй тариф
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Небольшое описание тарифа его цены и других характеристик
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="/tariff1.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Третий тариф
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Небольшое описание тарифа его цены и других характеристик
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default TariffItem;