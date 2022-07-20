import React, { useEffect } from "react";
import Router from "./components/Router";
import GlobalStyles from "./components/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { loadUserInfoDB } from "../src/redux/modules/user";

function App() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUserInfoDB());
    }
  }, [isLogin]);
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
