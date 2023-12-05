import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";

import { useState, useEffect } from "react";
const Registration = () => {
  const navigate = useNavigate();
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    axios.post(`${baseUrl}/signup`, data)
      .then(response => {
        if (response.status === 201) {
          navigate('/login');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography component="h1" variant="h3">
            Registration
          </Typography>
        </Grid>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          inputProps={{ maxLength: 20, minLength: 6 }}
          helperText="The username must be between 6-20 characters."
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
          inputProps={{ maxLength: 16, minLength: 6 }}
          helperText="The password must be between 6-16 characters."
        />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/login" underline="none">Already have an Account?</Link>
        </Grid>
        <Button
          color="secondary"
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