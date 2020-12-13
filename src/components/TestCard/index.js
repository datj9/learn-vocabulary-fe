import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Box,
    CircularProgress,
    makeStyles,
    Typography,
    Grid,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
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

export default function TestCard({ test, i }) {
    const classes = useStyles();
    const history = useHistory();
    const { resultsList, isLoading, loaded } = useSelector(
        (state) => state.test
    );
    const numberOfCompletedQuestions = resultsList[test.id]?.records.reduce(
        (total, num) => (num >= 0 ? total + 1 : total),
        0
    );
    const questionsLength = test.questions?.length || 0;
    const haveResult = resultsList[test.id];

    return (
        <Grid key={test.id || i} item xs={12} sm={6} lg={4}>
            <Card className={classes.card}>
                <CardActionArea>
                    {isLoading || loaded === false ? (
                        <Skeleton
                            animation='wave'
                            variant='rect'
                            className={classes.media}
                        />
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
                            <Skeleton
                                animation='wave'
                                height={35}
                                width='60%'
                                style={{ marginBottom: 6 }}
                            />
                        ) : (
                            <Typography
                                gutterBottom
                                variant='h5'
                                component='h2'
                            >
                                {test.title}
                            </Typography>
                        )}
                        {isLoading || loaded === false ? (
                            <Skeleton
                                animation='wave'
                                height={15}
                                width='80%'
                                style={{ marginBottom: 6 }}
                            />
                        ) : (
                            <Typography
                                variant='body2'
                                color='textSecondary'
                                component='p'
                            >
                                {test.description}
                            </Typography>
                        )}
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Box
                        width='100%'
                        display='flex'
                        justifyContent='space-between'
                    >
                        {isLoading || loaded === false ? (
                            <Skeleton
                                animation='wave'
                                height={20}
                                width='3rem'
                                style={{ marginBottom: 6 }}
                            />
                        ) : (
                            <Button
                                onClick={() =>
                                    history.push(`/tests/${test.id}`)
                                }
                                size='small'
                                color='primary'
                            >
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
                                    value={
                                        haveResult
                                            ? (numberOfCompletedQuestions /
                                                  questionsLength) *
                                              100
                                            : 0
                                    }
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
                                    <Typography
                                        variant='caption'
                                        component='div'
                                        color='textSecondary'
                                    >
                                        {`${
                                            haveResult
                                                ? (numberOfCompletedQuestions /
                                                      questionsLength) *
                                                      100 +
                                                  "%"
                                                : "0%"
                                        }`}
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    );
}
