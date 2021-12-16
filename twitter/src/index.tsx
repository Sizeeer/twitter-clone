//Core
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

//Styles
import "./index.scss";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

//Components
import App from "./App";

//Other
import theme from "./theme";
import { CssBaseline } from "@material-ui/core";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById("root")
);
