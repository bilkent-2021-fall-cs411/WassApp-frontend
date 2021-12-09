import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "~/pages/Login";
import SignUp from "~/pages/SignUp";
import ChatList from "~/pages/ChatList";

const MainRouter = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/chat-list" component={ChatList} />
    </Switch>
  );
};

export default withRouter(MainRouter);
