import React, { useEffect, useState } from "react";
import "./style.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { signInStart, clearErrors } from "../../redux/user/actions";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(6),
        height: theme.spacing(6),
        backgroundColor: "transparent",
        borderRadius: "0.2rem",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: "none",
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const dispatch = useDispatch();
    const { errors, isLoading } = useSelector((state) => state.user);

    const submitSignIn = (e) => {
        e.preventDefault();
        const errorsText = {
            email: "",
            password: "",
        };
        if (email && password) {
            dispatch(signInStart({ email, password }));
        }
        if (!email) {
            errorsText.email = "Vui lòng nhập email";
        }

        if (!password) {
            errorsText.password = "Vui lòng nhập mật khẩu";
        }
        setEmailErrorText(errorsText.email);
        setPasswordErrorText(errorsText.password);
    };

    useEffect(() => {
        if (errors.email?.includes("not exist")) {
            setEmailErrorText("Email không tồn tại");
        } else if (errors.email?.includes("invalid")) {
            setEmailErrorText("Email không hợp lệ");
        }

        return () => {
            dispatch(clearErrors());
        };
    }, [errors.email, dispatch]);

    useEffect(() => {
        if (errors.password?.includes("not correct") || errors.password?.includes("too short")) {
            setPasswordErrorText("Mật khẩu không chính xác");
        }
    }, [errors.password]);

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar src={require("../../assets/images/logo.png")} className={classes.avatar}></Avatar>
                <Typography component='h1' variant='h5'>
                    Đăng nhập
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailErrorText ? true : false}
                        helperText={emailErrorText ? emailErrorText : null}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email'
                        name='email'
                        autoComplete='email'
                        autoFocus
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordErrorText ? true : false}
                        helperText={passwordErrorText ? passwordErrorText : null}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Mật khẩu'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                    />
                    <Button
                        onClick={submitSignIn}
                        disabled={isLoading}
                        size='large'
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        {isLoading ? <CircularProgress size={26} color='primary' /> : "Đăng Nhập"}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link className={classes.link} to='/'>
                                <Typography color='primary' variant='body2'>
                                    Quên mật khẩu?
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link className={classes.link} to='/sign-up'>
                                <Typography color='primary' variant='body2'>
                                    {" "}
                                    {"Chưa có tài khoản? Đăng Ký"}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
