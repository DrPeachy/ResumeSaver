import logo from './logo.svg';
import './App.css';
import Dashboard from './component/Dashboard';
import Template from './component/Template';
import Home from './component/Home';
import Registration from './component/Registration';
import Login from './component/Login';
import Logout from './component/Logout';
import Workspace from './component/Workspace';
// import Test from './component/Test';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import React from 'react';
const App = ({ getTheme }) => {
  const useLight = useMediaQuery('(prefers-color-scheme: light)');
  const theme = React.useMemo(
    () =>
      getTheme(useLight? 'light' : 'dark'),
    [useLight],
  );
  
  axios.defaults.withCredentials = true;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Routes>
            <Route path="/" element={<Template />}>
              <Route index element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/registration" element={<Registration />} />
              <Route path='/signup' element={<Registration />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/workspace' element={<Workspace />} />
            </Route>
            <Route path='*' element={<Template />} />
          </Routes>
        </Router>
      </CssBaseline>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
