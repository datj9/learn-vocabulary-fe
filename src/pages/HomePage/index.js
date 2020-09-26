import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/core/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getTestsStart } from "../../redux/test/actions";

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(8),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    card: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    media: {
        height: 140,
    },
}));

export default function HomePage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { testsList, isLoading, results } = useSelector((state) => state.test);

    useEffect(() => {
        dispatch(getTestsStart());
    }, [dispatch]);

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Typography className={classes.title} variant='h4'>
                Các nhóm từ
            </Typography>
            {testsList.map((test) => (
                <Card key={test.id} className={classes.card}>
                    <CardActionArea>
                        {isLoading ? (
                            <Skeleton animation='wave' variant='rect' className={classes.media} />
                        ) : (
                            <CardMedia className={classes.media} image={test.image} title={test.title} />
                        )}
                        <CardContent>
                            {isLoading ? (
                                <Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />
                            ) : (
                                <Typography gutterBottom variant='h5' component='h2'>
                                    {test.title}
                                </Typography>
                            )}
                            {isLoading ? (
                                <Skeleton animation='wave' height={10} width='80%' style={{ marginBottom: 6 }} />
                            ) : (
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    {test.description}
                                </Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size='small' color='primary'>
                            Bắt đầu
                        </Button>
                    </CardActions>
                </Card>
            ))}
            {/* <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image='/static/images/cards/contemplative-reptile.jpg'
                        title='Contemplative Reptile'
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='h2'>
                            Từ cơ bản
                        </Typography>
                        <Typography variant='body2' color='textSecondary' component='p'>
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                            all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size='small' color='primary'>
                        Bắt đầu
                    </Button>
                </CardActions>
            </Card> */}
        </Container>
    );
}
