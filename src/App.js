import React, { useEffect } from "react";
import Router from "./components/common/Router";
import GlobalStyles from "./components/common/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { loadUserInfoDB } from "../src/redux/modules/user";

function App() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserInfoDB());
  }, [isLogin]);
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
