import React, { useEffect } from "react";
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
import io from "socket.io-client";

const socket = io.connect("https://learnvocab.herokuapp.com");

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

    useEffect(() => {
        socket.emit("auth", { token: "abcd" });
        socket.on("authSuccess", function (data) {
            console.log(data);
        });
    }, []);

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
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        Đăng Nhập
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
