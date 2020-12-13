import React from "react";
import { Route, Switch } from "react-router";
import ManageLearner from "./ManageLearner";

export const routes = [
    {
        component: ManageLearner,
        path: "/admin/manage-learners",
        allowAdmin: true,
    },
];

export default function AdminRoutes() {
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
