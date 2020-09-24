import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

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

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar src={require("../assets/images/logo.png")} className={classes.avatar} />
                <Typography component='h1' variant='h5'>
                    Đăng ký
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete='fname'
                                variant='outlined'
                                required
                                fullWidth
                                id='firstName'
                                label='Họ'
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='lastName'
                                label='Tên'
                                autoComplete='lname'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                id='email'
                                label='Địa chỉ email'
                                name='email'
                                autoComplete='email'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                            />
                        </Grid>
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        Đăng Ký
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