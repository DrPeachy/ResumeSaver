import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { Grid } from '@mui/material';

const Workspace = () => {
  const location = useLocation();
  const { _id } = location.state;

  useEffect(() => {
    // fetch workspace data from backend
    axios.get(`/workspace?id=${_id}`)
      .then(response => {
        if (response.status === 200) {
          // set workspace data
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [_id]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h4">havent decided</Typography>
        </Grid>
        <Grid item lg={6}>
          <Typography variant="h4">Editor area</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h4">Inspector</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Workspace;