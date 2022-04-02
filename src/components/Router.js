import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

// eslint-disable-next-line import/no-anonymous-default-export
const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj}></Navigation>}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              exact
              path="/"
              element={<Home userObj={userObj}></Home>}
            ></Route>
            <Route
              exact
              path="/profile"
              element={
                <Profile userObj={userObj} refreshUser={refreshUser}></Profile>
              }
            ></Route>
          </>
        ) : (
          <Route exact path="/" element={<Auth></Auth>}></Route>
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;
