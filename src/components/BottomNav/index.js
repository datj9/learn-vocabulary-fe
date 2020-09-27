import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SaveIcon from "@material-ui/icons/Save";
import PersonIcon from "@material-ui/icons/Person";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
    },
});
function BottomNav() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setValue(0);
                break;
            case "/saved-words":
                setValue(1);
                break;
            case "/sign-in":
                setValue(2);
                break;
            default:
                setValue(-1);
        }
    }, [location.pathname]);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction onClick={() => history.push("/")} label='Luyện tập' icon={<SpellcheckIcon />} />
            <BottomNavigationAction onClick={() => history.push("/saved-words")} label='Đã lưu' icon={<SaveIcon />} />
            <BottomNavigationAction onClick={() => history.push("/sign-in")} label='Tài khoản' icon={<PersonIcon />} />
        </BottomNavigation>
    );
}

export default BottomNav;
