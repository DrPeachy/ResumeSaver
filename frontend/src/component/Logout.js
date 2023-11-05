import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/logout')
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