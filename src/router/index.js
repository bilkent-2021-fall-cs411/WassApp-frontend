import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "~/pages/Login";
import SignUp from "~/pages/SignUp";
import Landing from "~/pages/Landing";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/landing" component={Landing} />
    </Switch>
  );
};

export default withRouter(MainRouter);
