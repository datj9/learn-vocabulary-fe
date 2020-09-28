import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import SaveIcon from "@material-ui/icons/Save";
import CheckIcon from "@material-ui/icons/Check";
import green from "@material-ui/core/colors/green";
import { useDispatch, useSelector } from "react-redux";
import { clearSaveSuccess, getOneTestStart, saveResult, saveWordStart } from "../../redux/test/actions";

const GreenRadio = withStyles({
    root: {
        "&$checked": {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color='default' {...props} />);
const GreenButton = withStyles({
    root: {
        backgroundColor: green[600],
        color: "#fff",
    },
})((props) => <Button {...props}>{props.children}</Button>);

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(8),
        marginTop: theme.spacing(4),
    },
    questionContainer: {
        marginTop: theme.spacing(2),
    },
    skeleton: {
        marginBottom: "15px",
    },
    circleSkeleton: {
        marginRight: "8px",
    },
    progress: {
        marginBottom: theme.spacing(2),
    },
}));
export default function TestPage() {
    const classes = useStyles();
    const { testId } = useParams();
    const dispatch = useDispatch();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState(-1);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const { test, result, isLoading, loaded, savedWords, saveSuccess } = useSelector((state) => state.test);
    const questions = test.questions ? test.questions : [];

    const handleAnswer = (e) => {
        setUserAnswer(e.target.value);

        if (isAuthenticated) {
            dispatch(saveResult(currentQuestion, +e.target.value, test.id));
        }
    };

    const changeToNextQuestion = () => {
        dispatch(clearSaveSuccess());
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer(-1);
    };
    const changeToPreviousQuestion = () => {
        dispatch(clearSaveSuccess());
        setCurrentQuestion(currentQuestion - 1);
        setUserAnswer(-1);
    };

    useEffect(() => {
        if (testId !== test.id) {
            dispatch(getOneTestStart(testId));
        }

        return () => {
            dispatch(clearSaveSuccess());
        };
    }, [dispatch, testId, test.id]);

    useEffect(() => {
        if (result.records && result.records[currentQuestion] >= 0) {
            setUserAnswer(result.records[currentQuestion] + "");
        }
    }, [currentQuestion, result]);

    useEffect(() => {
        if (result.records) {
            const indexOfLastQuestion = result.records.findIndex((record) => record === -1);
            setCurrentQuestion(indexOfLastQuestion !== -1 ? indexOfLastQuestion : questions.length - 1);
        }
    }, [questions.length, result.records]);

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Box display='flex' justifyContent='space-between'>
                {isLoading || loaded === false ? (
                    <Skeleton animation='wave' height={20} width='0%' style={{ marginBottom: 6, height: "48px" }} />
                ) : (
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
                            disabled={currentQuestion === test.questions?.length - 1}
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
                    <Skeleton animation='wave' height={10} width='100%' className={classes.skeleton} />
                ) : (
                    <LinearProgress
                        className={classes.progress}
                        variant='determinate'
                        value={((currentQuestion + 1) / questions.length) * 100}
                    />
                )}
                <FormControl component='fieldset'>
                    {isLoading || loaded === false ? (
                        <Skeleton animation='wave' height={20} width='60%' className={classes.skeleton} />
                    ) : (
                        <Typography
                            style={{ textAlign: questions[currentQuestion]?.word ? "center" : "left" }}
                            variant='h5'
                            color='textPrimary'
                            component='p'
                        >
                            {questions[currentQuestion]?.text}
                        </Typography>
                    )}
                    <RadioGroup onChange={handleAnswer} value={userAnswer} aria-label='answer' name='answer'>
                        {isLoading || loaded === false ? (
                            <>
                                <Box display='flex' flexDirection='row' className={classes.skeleton}>
                                    <Skeleton
                                        className={classes.circleSkeleton}
                                        variant='circle'
                                        animation='wave'
                                        height={22}
                                        width={22}
                                    />
                                    <Skeleton animation='wave' height={20} width='60%' />
                                </Box>
                                <Box display='flex' flexDirection='row' className={classes.skeleton}>
                                    <Skeleton
                                        className={classes.circleSkeleton}
                                        variant='circle'
                                        animation='wave'
                                        height={22}
                                        width={22}
                                    />
                                    <Skeleton animation='wave' height={20} width='60%' />
                                </Box>
                                <Box display='flex' flexDirection='row' className={classes.skeleton}>
                                    <Skeleton
                                        className={classes.circleSkeleton}
                                        variant='circle'
                                        animation='wave'
                                        height={22}
                                        width={22}
                                    />
                                    <Skeleton animation='wave' height={20} width='60%' />
                                </Box>
                            </>
                        ) : (
                            questions[currentQuestion]?.answers.map((answer, i) => (
                                <FormControlLabel
                                    key={i}
                                    value={i + ""}
                                    control={
                                        +userAnswer >= 0 && i === questions[currentQuestion].correctAnswer ? (
                                            <GreenRadio checked={userAnswer >= 0} />
                                        ) : (
                                            <Radio disabled={+userAnswer >= 0} color='primary' />
                                        )
                                    }
                                    label={answer}
                                />
                            ))
                        )}
                    </RadioGroup>
                </FormControl>
                {questions[currentQuestion]?.word &&
                savedWords?.includes(questions[currentQuestion].word._id) === false &&
                userAnswer >= 0 ? (
                    <Button
                        variant='contained'
                        color='primary'
                        startIcon={<SaveIcon />}
                        onClick={() => dispatch(saveWordStart(questions[currentQuestion].word._id))}
                    >
                        {saveSuccess ? "Đã Lưu" : "Lưu Từ"}
                    </Button>
                ) : saveSuccess === true ? (
                    <GreenButton startIcon={<CheckIcon />} variant='contained'>
                        Đã Lưu
                    </GreenButton>
                ) : null}
            </Box>
        </Container>
    );
}
