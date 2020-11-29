import { AppBar, Box, Button, Container, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/user/actions";

const useStyles = makeStyles((theme) => ({
  signUpBtn: {
    marginRight: theme.spacing(2),
    background: "linear-gradient(to right, #3d5af1, #223078)",
  },
}));

export default function Header() {
  const history = useHistory();
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    history.replace("/sign-in");
  };

  return (
    <AppBar color="transparent" position="static">
      <Toolbar>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Link to="/">
              <Typography color="primary" variant="h6">
                Lutata
              </Typography>
            </Link>
            {isAuthenticated ? (
              <Box display="flex" justifyContent="space-betweeb">
                <Button onClick={handleLogOut} variant="outlined" color="primary" size="large">
                  Đăng xuất
                </Button>
              </Box>
            ) : (
              <Box display="flex" justifyContent="space-between">
                <Button onClick={() => history.push("/sign-up")} className={classes.signUpBtn} variant="contained" color="primary" size="large">
                  Đăng Ký
                </Button>
                <Button onClick={() => history.push("/sign-in")} variant="outlined" color="primary" size="large">
                  Đăng Nhập
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
