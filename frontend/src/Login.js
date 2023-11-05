import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Grid, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";

import { useState, useEffect } from "react";


const Login = () => {
  const navigate = useNavigate();
  const [isUsernameExisted, setIsUsernameExisted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    axios.post('/login', data)
      .then(response => {
        if (response.data.message === 'Login successful') {
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUsernameChange = (event) => {
    axios.post('/checkUsername', { username: event.target.value })
      .then(response => {
        if (response.data.message) {
          setIsUsernameExisted(true);
        }else{
          setIsUsernameExisted(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar 
            sx={{ width: 80, height: 80, bgcolor: 'secondary.main' }}
            src={isUsernameExisted?"./assets/logo.png":""}   
            alt="n"
          >
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Grid>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoFocus
          onChange={handleUsernameChange}
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
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
}

export default Login;