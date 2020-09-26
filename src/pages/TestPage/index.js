import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { useDispatch, useSelector } from "react-redux";
import { getOneTestStart } from "../../redux/test/actions";

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(8),
        marginTop: theme.spacing(4),
    },
    questionContainer: {
        marginTop: theme.spacing(2),
    },
}));
export default function TestPage() {
    const classes = useStyles();
    const { testId } = useParams();
    const dispatch = useDispatch();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const { test, isLoading, loaded } = useSelector((state) => state.test);
    const [userAnswer, setUserAnswer] = useState(-1);

    const handleAnswer = (e) => {
        setUserAnswer(e.target.value);
    };

    const changeToNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer(-1);
    };
    const changeToPreviousQuestion = () => {
        setCurrentQuestion(currentQuestion - 1);
        setUserAnswer(-1);
    };

    useEffect(() => {
        dispatch(getOneTestStart(testId));
    }, [dispatch, testId]);

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Box display='flex' justifyContent='space-between'>
                {isLoading || loaded === false ? null : (
                    <>
                        <IconButton
                            disabled={currentQuestion === 0}
                            onClick={changeToPreviousQuestion}
                            size='medium'
                            color='primary'
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                            disabled={currentQuestion === test.questions.length - 1}
                            onClick={changeToNextQuestion}
                            size='medium'
                            color='primary'
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </>
                )}
            </Box>
            <Box className={classes.questionContainer} display='flex' flexDirection='column'>
                {isLoading || loaded === false ? (
                    <Skeleton animation='wave' height={20} width='60%' style={{ marginBottom: 6 }} />
                ) : (
                    <FormControl component='fieldset'>
                        <Typography
                            style={{ textAlign: test.questions[currentQuestion].word ? "center" : "left" }}
                            variant='h5'
                            color='textPrimary'
                            component='p'
                        >
                            {test.questions[currentQuestion].text}
                        </Typography>
                        <RadioGroup onChange={handleAnswer} value={userAnswer} aria-label='answer' name='answer'>
                            {test.questions[currentQuestion].answers.map((answer, i) => (
                                <FormControlLabel
                                    key={i}
                                    value={i + ""}
                                    control={<Radio color='primary' />}
                                    label={answer}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                )}
            </Box>
        </Container>
    );
}
