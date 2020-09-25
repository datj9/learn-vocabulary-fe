import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUpStart } from "../../redux/user/actions";
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
			errorsText.email = "Vui long nhap email";
		}
		if (!name) {
			errorsText.name = "Vui long nhap ten";
		}
		if (!password) {
			errorsText.password = "Vui long nhap mat khau";
		}
		setNameErrorText(errorsText.name);
		setEmailErrorText(errorsText.email);
		setPasswordErrorText(errorsText.password);
	};

	useEffect(() => {
		if (errors.email?.includes("exist")) {
			setEmailErrorText("Email da ton tai");
		} else if (errors.email?.includes("invalid")) {
			setEmailErrorText("Email khong hop le");
		}
	}, [errors.email]);

	useEffect(() => {
		if (errors.name?.includes("too short")) {
			setNameErrorText("Ten qua ngan");
		}
	}, [errors.name]);

	useEffect(() => {
		if (errors.password?.includes("too short")) {
			setPasswordErrorText("Mat khau phai co it nhat 8 ky tu");
		}
	}, [errors.password]);

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
								name='email'
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
