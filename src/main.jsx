import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider, GlobalStyles } from "@mui/material";
import { grey, amber } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a52be", //#6fa5f5 new blue ; #2a52be old blue
    },
    secondary: {
      main: "#ff9600",
    },
    background: {
      default: grey[100],
    },
    secondary: {
      main: amber[800],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.up("xs")]: {
            borderRadius: "15px",
            paddingLeft: "10px",
            paddingRight: "10px",
            lineHeight: "15px",
          },
          [theme.breakpoints.up("sm")]: {
            borderRadius: "30px",
            paddingLeft: "20px",
            paddingRight: "20px",
            lineHeight: "25px",
          },
        }),
      },
    },
  },
});

const globalStyles = (
  <GlobalStyles
    styles={{
      body: { backgroundColor: theme.palette.background.default },
    }}
  />
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {" "}
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {globalStyles}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
