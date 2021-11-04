//Core
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

//Styles
import "./index.scss";

//Components
import App from "./App";

//Other
import theme from "./theme";
import { CssBaseline } from "@material-ui/core";
import { store } from "./store/store";

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
