import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check JWT token
    const checkAuth = async () => {
      try {
        await axios.get('/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then((response) => {
          if(response.status === 200) {
            console.log('User is logged in.');
            setData(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          navigate('/login');
        });
      } catch (error) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data}</p>
    </div>
  );
}

export default Dashboard;
