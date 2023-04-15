import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E71FF",
    },
    bg: {
      main: "#EDF0F9",
    },
  },
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#EDF0F9" },
        }}
      />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
