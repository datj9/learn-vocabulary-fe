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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import { clearSaveSuccess, getOneTestStart, saveResult, saveWordStart } from "../../redux/test/actions";

const GreenRadio = withStyles({
  root: {
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
const GreenButton = withStyles({
  root: {
    backgroundColor: green[600],
    color: "#fff",
  },
})((props) => (
  <Button size="small" {...props}>
    {props.children}
  </Button>
));

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TestPage() {
  const classes = useStyles();
  const { testId } = useParams();
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState(-1);
  const [temporaryResult, setTemporaryResult] = useState({});
  const [openModalResult, setOpenModalResult] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { test, result, isLoading, loaded, savedWords, saveSuccess } = useSelector((state) => state.test);
  const { questions = [] } = test;
  const temporaryResultLength = Object.keys(temporaryResult).length;

  const handleAnswer = (e) => {
    setUserAnswer(e.target.value);

    if (isAuthenticated) {
      dispatch(saveResult(currentQuestion, +e.target.value, test.id));
    } else {
      setTemporaryResult({
        ...temporaryResult,
        [currentQuestion]: {
          userAnswer: e.target.value,
          correctAnswer: questions[currentQuestion].correctAnswer + "",
        },
      });
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
  const handleCloseModalResult = () => {
    setOpenModalResult(false);
  };

  const ModalResult = () => {
    const numberOfCorrectAnswers =
      isAuthenticated && result.records
        ? result.records.reduce((accumulator, currentValue, i) => (currentValue === questions[i].correctAnswer ? accumulator + 1 : accumulator), 0)
        : Object.keys(temporaryResult).reduce(
            (accumulator, currentValue, i) =>
              temporaryResult[currentValue].userAnswer === temporaryResult[currentValue].correctAnswer ? accumulator + 1 : accumulator,
            0
          );
    const correctPercent = (numberOfCorrectAnswers / questions.length) * 100;
    const incorrectPercent = 100 - correctPercent;

    const numberOfIncorrectAnswers = questions.length - numberOfCorrectAnswers;

    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModalResult}
        onClose={handleCloseModalResult}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalResult}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Kết quả</h2>
            <p id="transition-modal-description">
              <Typography>Tổng số câu hỏi: {questions.length}</Typography>
              <Typography>
                Số câu trả lời đúng: {numberOfCorrectAnswers} ({correctPercent}%)
              </Typography>
              <Typography>
                Số câu trả lời sai: {numberOfIncorrectAnswers} ({incorrectPercent}%)
              </Typography>
              <Typography>Điểm của bạn: {correctPercent}/100</Typography>
            </p>
          </div>
        </Fade>
      </Modal>
    );
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
    const handleArrowKeyPress = (e) => {
      if (e.keyCode === 37 && currentQuestion > 0) {
        changeToPreviousQuestion();
      } else if (e.keyCode === 39 && currentQuestion < questions.length - 1) {
        changeToNextQuestion();
      }
    };

    document.addEventListener("keydown", handleArrowKeyPress);

    return () => {
      document.removeEventListener("keydown", handleArrowKeyPress);
    };
  }, [currentQuestion, questions.length]);

  useEffect(() => {
    if (result.records && result.records[currentQuestion] >= 0) {
      setUserAnswer(result.records[currentQuestion] + "");
    } else if (temporaryResult[currentQuestion] !== undefined) {
      setUserAnswer(temporaryResult[currentQuestion].userAnswer);
    }
  }, [currentQuestion, result.records, temporaryResult]);

  useEffect(() => {
    if (result.records) {
      const indexOfLastQuestion = result.records.findIndex((record) => record === -1);
      setCurrentQuestion(indexOfLastQuestion !== -1 ? indexOfLastQuestion : questions.length - 1);
    }
  }, [questions.length, result.records]);

  useEffect(() => {
    if ((questions.length > 0 && Object.keys(temporaryResult).length === questions.length) || (result.records && result.records.length === questions.length)) {
      setOpenModalResult(true);
    }
  }, [temporaryResultLength, result.records, questions.length, temporaryResult]);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <ModalResult />
      <Box display="flex" justifyContent="space-between">
        {isLoading || loaded === false ? (
          <Skeleton animation="wave" height={20} width="0%" style={{ marginBottom: 6, height: "48px" }} />
        ) : (
          <>
            <IconButton disabled={currentQuestion === 0} onClick={changeToPreviousQuestion} size="medium" color="primary">
              <ChevronLeftIcon />
            </IconButton>
            <IconButton disabled={currentQuestion === test.questions?.length - 1} onClick={changeToNextQuestion} size="medium" color="primary">
              <ChevronRightIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Box className={classes.questionContainer} display="flex" flexDirection="column">
        {isLoading || loaded === false ? (
          <Skeleton animation="wave" height={10} width="100%" className={classes.skeleton} />
        ) : (
          <LinearProgress className={classes.progress} variant="determinate" value={((currentQuestion + 1) / questions.length) * 100} />
        )}
        <FormControl component="fieldset">
          {isLoading || loaded === false ? (
            <Skeleton animation="wave" height={20} width="60%" className={classes.skeleton} />
          ) : (
            <Typography
              style={{
                textAlign: questions[currentQuestion]?.word ? "center" : "left",
              }}
              variant="h5"
              color="textPrimary"
              component="p"
            >
              {questions[currentQuestion]?.text}
            </Typography>
          )}
          <RadioGroup onChange={handleAnswer} value={userAnswer} aria-label="answer" name="answer">
            {isLoading || loaded === false ? (
              <>
                <Box display="flex" flexDirection="row" className={classes.skeleton}>
                  <Skeleton className={classes.circleSkeleton} variant="circle" animation="wave" height={22} width={22} />
                  <Skeleton animation="wave" height={20} width="60%" />
                </Box>
                <Box display="flex" flexDirection="row" className={classes.skeleton}>
                  <Skeleton className={classes.circleSkeleton} variant="circle" animation="wave" height={22} width={22} />
                  <Skeleton animation="wave" height={20} width="60%" />
                </Box>
                <Box display="flex" flexDirection="row" className={classes.skeleton}>
                  <Skeleton className={classes.circleSkeleton} variant="circle" animation="wave" height={22} width={22} />
                  <Skeleton animation="wave" height={20} width="60%" />
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
                      <Radio disabled={+userAnswer >= 0} color="primary" />
                    )
                  }
                  label={answer}
                />
              ))
            )}
          </RadioGroup>
        </FormControl>
        {questions[currentQuestion]?.word && savedWords?.includes(questions[currentQuestion].word._id) === false && userAnswer >= 0 ? (
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => dispatch(saveWordStart(questions[currentQuestion].word._id))}>
            {saveSuccess ? "Đã Lưu" : "Lưu Từ"}
          </Button>
        ) : saveSuccess === true ? (
          <GreenButton startIcon={<CheckIcon />} variant="contained">
            Đã Lưu
          </GreenButton>
        ) : null}
      </Box>
    </Container>
  );
}
