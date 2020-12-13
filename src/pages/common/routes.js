import SignIn from "./SignIn";
import SignUp from "./SignUp";
import TestPage from "./TestPage";
import HomePage from "./HomePage";
import React from "react";
import SavedWords from "./SavedWords";
import { Route, Switch } from "react-router";

export const routes = [
    {
        component: HomePage,
        path: "/",
        allowAdmin: true,
        allowLearner: true,
    },
    {
        component: SavedWords,
        path: "/saved-words",
        allowAdmin: true,
        allowLearner: true,
    },
    {
        component: SignIn,
        path: "/sign-in",
        allowAdmin: true,
        allowLearner: true,
    },
    {
        component: SignUp,
        path: "/sign-up",
        allowAdmin: true,
        allowLearner: true,
    },
    {
        component: TestPage,
        path: "/tests/:testId",
        allowAdmin: true,
        allowLearner: true,
    },
];

export default function CommonRoutes() {
    const role = "admin";
    const roleAllowance = () => {
        switch (role) {
            case "admin":
                return "allowAdmin";

            default:
                return null;
        }
    };
    return (
        <Switch>
            {routes.map(({ path, component: Component, ...route }, i) => (
                <Route
                    exact
                    key={i}
                    path={path}
                    render={() => {
                        if (route[roleAllowance()]) return <Component />;
                        return null;
                    }}
                />
            ))}
        </Switch>
    );
}
