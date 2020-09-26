import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUpStart, clearErrors } from "../../redux/user/actions";
import { CircularProgress } from "@material-ui/core";

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: "none",
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameErrorText, setNameErrorText] = useState("");
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const dispatch = useDispatch();
    const { errors, isLoading } = useSelector((state) => state.user);

    const submitSignUp = (e) => {
        e.preventDefault();
        const errorsText = {
            name: "",
            email: "",
            password: "",
        };
        if (email && password && name) {
            dispatch(signUpStart({ email, name, password }));
        }
        if (!email) {
            errorsText.email = "Vui lòng nhập email";
        }
        if (!name) {
            errorsText.name = "Vui lòng nhập họ tên";
        }
        if (!password) {
            errorsText.password = "Vui lòng nhập mật khẩu";
        }
        setNameErrorText(errorsText.name);
        setEmailErrorText(errorsText.email);
        setPasswordErrorText(errorsText.password);
    };

    useEffect(() => {
        if (errors.email?.includes("exist")) {
            setEmailErrorText("Email đã tồn tại");
        } else if (errors.email?.includes("invalid")) {
            setEmailErrorText("Email không hợp lệ");
        }

        return () => {
            dispatch(clearErrors());
        };
    }, [errors.email, dispatch]);

    useEffect(() => {
        if (errors.name?.includes("too short")) {
            setNameErrorText("Tên phải có ít nhất 3 ký tự");
        }

        return () => {
            dispatch(clearErrors());
        };
    }, [errors.name, dispatch]);

    useEffect(() => {
        if (errors.password?.includes("too short")) {
            setPasswordErrorText("Mật khẩu phải có ít nhất 8 ký tự");
        }

        return () => {
            dispatch(clearErrors());
        };
    }, [errors.password, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearErrors());
        };
    }, [dispatch]);

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar src={require("../../assets/images/logo.png")} className={classes.avatar} />
                <Typography component='h1' variant='h5'>
                    Đăng ký
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={nameErrorText ? true : false}
                                helperText={nameErrorText ? nameErrorText : null}
                                variant='outlined'
                                required
                                fullWidth
                                id='lastName'
                                label='Họ Tên'
                                autoComplete='lname'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={emailErrorText ? true : false}
                                helperText={emailErrorText ? emailErrorText : null}
                                variant='outlined'
                                required
                                fullWidth
                                id='email'
                                label='Địa chỉ email'
                                type='email'
                                autoComplete='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={passwordErrorText ? true : false}
                                helperText={passwordErrorText ? passwordErrorText : null}
                                variant='outlined'
                                required
                                fullWidth
                                name='password'
                                label='Mật khẩu'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        size='large'
                        disabled={isLoading}
                        onClick={submitSignUp}
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        {isLoading ? <CircularProgress size={26} color='primary' /> : "Đăng Ký"}
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link className={classes.link} to='/sign-in'>
                                <Typography color='primary' variant='body2'>
                                    Đã có tài khoản? Đăng nhập
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
