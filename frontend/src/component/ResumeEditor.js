import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const EleItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f5f5f5',
  padding: theme.spacing(1),
  textAlign: 'center',
  alignItems: 'flex-start',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const ResumeEducationSlot = (institution, start) => {

}

const ResumeExperienceSlot = () => {

}

const ResumeEditor = () => {

  const handleResumeSubmit = (event) => {
    event.preventDefault();
  };



  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      padding={0}
      margin={0}
      gap={1}
      backgroundColor="#fff"

    >
      <Grid item
        backgroundColor="red"
        width="100%"
      >
        <Typography variant="body1"
          align="left"
        >Resume Editor</Typography>
      </Grid>
      <Grid item
        backgroundColor="blue"
        width="100%"
      >
        ssss
      </Grid>
      <Grid item
        backgroundColor="red"
        width="100%"
      >
        ssss
      </Grid>
    </Grid>
  );
};

export default ResumeEditor;