import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/dashboard')
    .then(response => {
      if (response.status === 200) {
        setData(response.data.message);
      }
    })
    .catch(error => {
      if (error.response.status === 401) {
        navigate('/login');
      }
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data}</p>
    </div>
  );
}

export default Dashboard;
