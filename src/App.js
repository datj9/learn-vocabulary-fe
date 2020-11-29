import React, { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import JwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { requestNewAccessToken, setUser } from "./redux/user/actions";
import Header from "./components/Header";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const TestPage = lazy(() => import("./pages/TestPage"));
const SavedWords = lazy(() => import("./pages/SavedWords"));

function App() {
  const theme = useTheme();
  const isLargerThanSMScreen = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const authenticate = (Page) => {
    if (isAuthenticated) {
      return <Page />;
    } else {
      return <Redirect to="/" />;
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    try {
      const user = JwtDecode(accessToken);
      if (user.exp > Date.now() / 1000) {
        dispatch(setUser(user));
      } else if (refreshToken) {
        dispatch(requestNewAccessToken());
      }
    } catch (error) {}
  }, [dispatch]);

  const Loader = () => (
    <div className="loader-container">
      <img alt="loading..." src={require("./assets/images/spinner.svg")} />
    </div>
  );

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        {isLargerThanSMScreen ? <Header /> : null}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/tests/:testId" component={TestPage} />
          <Route exact path="/saved-words" render={() => authenticate(SavedWords)} />
          <Route
            exact
            path="/sign-in"
            render={() => {
              if (isAuthenticated) {
                return <Redirect to="/" />;
              } else {
                return <SignIn />;
              }
            }}
          />
          <Route
            exact
            path="/sign-up"
            component={() => {
              if (isAuthenticated) {
                return <Redirect to="/" />;
              } else {
                return <SignUp />;
              }
            }}
          />
        </Switch>
        {isLargerThanSMScreen ? null : <BottomNav />}
      </Router>
    </Suspense>
  );
}

export default App;
