import React, { useEffect } from "react";
import Router from "./components/Router";
import GlobalStyles from "./components/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { loadUserInfoDB, clearUserInfo } from "../src/redux/modules/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUserInfoDB());
    } else {
      dispatch(clearUserInfo());
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
