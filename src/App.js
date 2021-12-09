import React from "react";
import {
  BrowserRouter,
  AuthRoute,
  Route,
  PrivateRoute,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
