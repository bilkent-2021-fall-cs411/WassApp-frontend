import React from "react";
import MainRouter from "~/router";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <>
      <div className="main-background-bg" />
      <MainRouter />
    </>
  );
};

export default Home;
