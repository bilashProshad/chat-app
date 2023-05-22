import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E71FF",
    },
    bg: {
      main: "#EDF0F9",
      // main: "#fff",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});

TimeAgo.addDefaultLocale(en);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#EDF0F9" },
        }}
      />
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
