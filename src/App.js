import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import JwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { requestNewAccessToken, setUser } from "./redux/user/actions";
import NavBar from "./components/NavBar";

const AdminRoutes = lazy(() => import("./pages/admin/routes"));
const CommonRoutes = lazy(() => import("./pages/common/routes"));

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    useEffect(() => {
        try {
            const user = JwtDecode(accessToken);
            if (user.exp > Date.now() / 1000) {
                dispatch(setUser(user));
            } else if (refreshToken) {
                dispatch(requestNewAccessToken());
            }
        } catch (error) {}
    }, [dispatch, accessToken, refreshToken]);

    const Loader = () => (
        <div className='loader-container'>
            <img
                alt='loading...'
                src={require("./assets/images/spinner.svg")}
            />
        </div>
    );
    return (
        <Suspense fallback={<Loader />}>
            <Router>
                <NavBar />
                <Switch>
                    <Route path='/admin' component={AdminRoutes} />
                    <Route path='/' component={CommonRoutes} />
                </Switch>
                <BottomNav />
            </Router>
        </Suspense>
    );
}

export default App;
