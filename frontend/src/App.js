import logo from './logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import Template from './Template';
import Registration from './Registration';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header set:', config.headers.Authorization);
    console.log('Config:', config);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<h1>hello</h1>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration" element={<Registration />} />
          <Route path='/login' element={<h1>Login</h1>} />
        </Route>
      <Route path='*' element={<Template />} />
      </Routes>
    </Router>
  );
}

export default App;
