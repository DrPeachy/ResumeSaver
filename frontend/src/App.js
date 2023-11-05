import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import Template from './Template';
import Registration from './Registration';
import Login from './Login';
import Logout from './Logout';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<h1>hello</h1>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration" element={<Registration />} />
          <Route path='/signup' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Route>
      <Route path='*' element={<Template />} />
      </Routes>
    </Router>
  );
}

export default App;
