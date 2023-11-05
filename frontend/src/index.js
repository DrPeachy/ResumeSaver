import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


const root = ReactDOM.createRoot(document.getElementById('root'));
let lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f5d05b',
    },
    secondary: {
      main: '#ff4081',
    },
    info: {
      main: '#4902d1',
    },
    error: {
      main: '#870606',
    },
    warning: {
      main: '#d2710e',
    },
    success: {
      main: '#13ea1b',
    },
  },
  typography: {
    fontFamily: 'Lora',
    fontSize: 13,
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f5d05b',
    },
    secondary: {
      main: '#ff4081',
    },
    info: {
      main: '#4902d1',
    },
    error: {
      main: '#870606',
    },
    warning: {
      main: '#d2710e',
    },
    success: {
      main: '#13ea1b',
    },
  },
  typography: {
    fontFamily: 'Lora',
    fontSize: 13,
  },
});

const getTheme = (pref = "light") => {
  let res = null;
  if (pref === "light") {
    res = lightTheme;
  } else {
    res = darkTheme;
  }
  res = responsiveFontSizes(res);
  return res;
}

root.render(
  <React.StrictMode>
    <App getTheme={getTheme}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
