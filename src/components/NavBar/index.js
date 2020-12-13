import React from "react";
import {
    Box,
    Container,
    useTheme,
    useMediaQuery,
    makeStyles,
    Button,
    Toolbar,
    AppBar,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    rightBarContainer: {
        width: theme.spacing(80),
    },
    signUpBtn: {
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary["600"]})`,
        color: "#fff",
        marginLeft: theme.spacing(2),
        paddingLeft: theme.spacing(2.625),
        paddingRight: theme.spacing(2.625),
    },
    logo: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        borderRadius: theme.spacing(0.5),
    },
}));

export default function NavBar() {
    const classes = useStyles();
    const theme = useTheme();
    const isLargerThanSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const history = useHistory();

    if (isLargerThanSmallScreen)
        return (
            <AppBar color='transparent' position='static'>
                <Toolbar>
                    <Container>
                        <Box
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Link to='/'>
                                <Box display='flex' alignItems='center'>
                                    <img
                                        src={require("../../assets/images/logo.png")}
                                        className={classes.logo}
                                        alt='logo'
                                    />
                                </Box>
                            </Link>
                            <Box
                                display='flex'
                                justifyContent='flex-end'
                                className={classes.rightBarContainer}
                            >
                                <Button
                                    onClick={() => history.push("/sign-in")}
                                    size='large'
                                    variant='outlined'
                                    color='primary'
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => history.push("/sign-up")}
                                    size='large'
                                    variant='contained'
                                    className={classes.signUpBtn}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        );
    return null;
}
