import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const Logout = () => {
  const navigate = useNavigate();
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
  useEffect(() => {
    axios.get(`${baseUrl}/logout`)
    .then(response => {
      if (response.status === 200) {
        navigate('/');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <h1>Logout Successfully</h1>
    </div>
  );
}

export default Logout;