import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";
import JwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/user/actions";

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const user = JwtDecode(accessToken);
            console.log(user.exp > Date.now() / 1000);
            dispatch(setUser(user));
        } catch (error) {}
    }, [dispatch]);

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/tests/:testId' component={TestPage} />
                <Route
                    exact
                    path='/sign-in'
                    render={() => {
                        if (isAuthenticated) {
                            return <Redirect to='/' />;
                        } else {
                            return <SignIn />;
                        }
                    }}
                />
                <Route
                    exact
                    path='/sign-up'
                    component={() => {
                        if (isAuthenticated) {
                            return <Redirect to='/' />;
                        } else {
                            return <SignUp />;
                        }
                    }}
                />
            </Switch>
            <BottomNav />
        </Router>
    );
}

export default App;
