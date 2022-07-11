import React, { useEffect } from "react";
import Router from "./components/Router";
import GlobalStyles from "./components/GlobalStyles";
import { useDispatch } from "react-redux";
import { loadUserInfoDB } from "../src/redux/modules/user";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadUserInfoDB());
  }, []);
  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
