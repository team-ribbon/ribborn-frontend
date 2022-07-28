import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import theme from "./shared/theme";
import ScrollToTop from "./components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
