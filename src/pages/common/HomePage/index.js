import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getTestsStart } from "../../../redux/test/actions";
import TestCard from "../../../components/TestCard";

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(8),
        marginTop: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
}));

export default function HomePage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.test.isLoading);
    const loaded = useSelector((state) => state.test.loaded);
    const testsList = useSelector((state) => state.test.testsList);
    const renderedTestsList = loaded ? testsList : [{}, {}, {}];

    useEffect(() => {
        dispatch(getTestsStart());
    }, [dispatch]);

    return (
        <Container maxWidth='lg' className={classes.container}>
            {isLoading || loaded === false ? (
                <Skeleton
                    animation='wave'
                    height={65}
                    width='30%'
                    style={{ marginBottom: 6 }}
                />
            ) : (
                <Typography className={classes.title} variant='h4'>
                    Nhóm từ
                </Typography>
            )}
            <Grid
                container
                direction='row'
                justify='flex-start'
                alignItems='center'
                spacing={3}
            >
                {renderedTestsList.map((test, i) => (
                    <TestCard test={test} i={i} />
                ))}
            </Grid>
        </Container>
    );
}
