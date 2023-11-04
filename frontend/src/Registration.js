import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";

import { useState, useEffect } from "react";
const Registration = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    axios.post('/signup', data)
    .then(response => {
      if (response.data.message === 'Login successful') {
        navigate('/dashboard');
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          register
        </Button>
      </Box>
    </Container>
  );
};
export default Registration;