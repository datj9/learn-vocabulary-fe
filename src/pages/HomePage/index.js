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
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import { getTestsStart } from "../../redux/test/actions";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(8),
        marginTop: theme.spacing(4),
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
    bottom: {
        color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    top: {
        color: "#1a90ff",
        animationDuration: "550ms",
        position: "absolute",
        left: 0,
    },
    circle: {
        strokeLinecap: "round",
    },
}));

export default function HomePage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { testsList, isLoading, resultsList, loaded } = useSelector((state) => state.test);

    useEffect(() => {
        if (testsList.length === 0) {
            dispatch(getTestsStart());
        }
    }, [dispatch, testsList.length]);

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Typography className={classes.title} variant='h4'>
                Các nhóm từ
            </Typography>
            {(testsList.length === 0 ? [{}, {}, {}] : testsList).map((test, i) => (
                <Card key={test.id || i} className={classes.card}>
                    <CardActionArea>
                        {isLoading || loaded === false ? (
                            <Skeleton animation='wave' variant='rect' className={classes.media} />
                        ) : (
                            <CardMedia
                                onClick={() => history.push(`/tests/${test.id}`)}
                                className={classes.media}
                                image={test.image}
                                title={test.title}
                            />
                        )}
                        <CardContent>
                            {isLoading || loaded === false ? (
                                <Skeleton animation='wave' height={35} width='60%' style={{ marginBottom: 6 }} />
                            ) : (
                                <Typography gutterBottom variant='h5' component='h2'>
                                    {test.title}
                                </Typography>
                            )}
                            {isLoading || loaded === false ? (
                                <Skeleton animation='wave' height={15} width='80%' style={{ marginBottom: 6 }} />
                            ) : (
                                <Typography variant='body2' color='textSecondary' component='p'>
                                    {test.description}
                                </Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Box width='100%' display='flex' justifyContent='space-between'>
                            {isLoading || loaded === false ? (
                                <Skeleton animation='wave' height={20} width='3rem' style={{ marginBottom: 6 }} />
                            ) : (
                                <Button onClick={() => history.push(`/tests/${test.id}`)} size='small' color='primary'>
                                    Bắt đầu
                                </Button>
                            )}
                            {isLoading || loaded === false ? (
                                <Skeleton
                                    animation='wave'
                                    variant='circle'
                                    width={40}
                                    height={40}
                                    style={{ marginBottom: 6 }}
                                />
                            ) : (
                                <Box position='relative' display='inline-flex'>
                                    <CircularProgress
                                        variant='determinate'
                                        className={classes.bottom}
                                        size={40}
                                        thickness={4}
                                        value={100}
                                    />
                                    <CircularProgress
                                        variant='determinate'
                                        className={classes.top}
                                        classes={{
                                            circle: classes.circle,
                                        }}
                                        size={40}
                                        thickness={4}
                                        value={0}
                                    />
                                    <Box
                                        top={0}
                                        left={0}
                                        bottom={0}
                                        right={0}
                                        position='absolute'
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='center'
                                    >
                                        <Typography variant='caption' component='div' color='textSecondary'>
                                            {`${
                                                resultsList[test.id]
                                                    ? resultsList[test.id].records.reduce(
                                                          (total, num) => total + num,
                                                          0
                                                      )
                                                    : "0"
                                            }/${test.questions?.length}`}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </CardActions>
                </Card>
            ))}
        </Container>
    );
}
