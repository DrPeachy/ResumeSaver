import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Grid, Snackbar, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { FormControlLabel } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { Alert } from "@mui/material";
import Link from "@mui/material/Link";
import { useState, useEffect } from "react";

const WarningString = {
  unauthorized: "Please login first",
  failedAuthentication: "Invalid username or password"
};


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUsernameExisted, setIsUsernameExisted] = useState(false);
  const [isWarning, setIsWarning] = useState(location.state?.isWarning || 0);
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    axios.post(`${baseUrl}/login`, data)
      .then(response => {
        if (response.data.message === 'Login successful') {
          navigate('/dashboard');
        }
      })
      .catch(error => {
        setIsWarning("failedAuthentication");
      });
  };

  const handleUsernameChange = (event) => {
    axios.post(`${baseUrl}/checkUsername`, { username: event.target.value })
      .then(response => {
        if (response.data.message) {
          setIsUsernameExisted(true);
        } else {
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
            src={isUsernameExisted ? `${baseUrl}/assets/logo.png` : ""}
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
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/signup" underline="none">Sign up</Link>
          <Link href="/forgot-password" underline="none">Forgot password?</Link>
        </Grid>
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isWarning}
        autoHideDuration={3000}
        onClose={() => setIsWarning(false)}
      >
        <Alert severity="error">{WarningString[isWarning]}</Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;