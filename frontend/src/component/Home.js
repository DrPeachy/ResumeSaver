import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Grid container
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      lg={10}
      xl={10}
      md={10}
    >
      <Grid item
        sx={{
          width: '100%',
        }}
      >
        <Typography component="h1" variant="h4">
          Hello, welcome to Resume Saver!
        </Typography>
      </Grid>
      <Grid item
        sx={{
          width: '100%',
        }}
      >
        <Typography component="h2" variant="h6">
          1. This is a simple resume builder that allows you to create, import, save, and export your resumes.
          Get started by clicking on the Avatar on the top right corner to sign up or log in!
        </Typography>
        <Typography component="h2" variant="h6">
          2. Once you are logged in, create a workspace inside your dashboard and start building your resume!
        </Typography>
        <Typography component="h2" variant="h6">
          3. You can import existing pdf file to your workspace by clicking the upload button on the left. In the middle panel, you can edit the content of your resume in the editor tab and check the pdf in realtime in the preview tab. And in the Inspector tab, adjust the format for your resume.
        </Typography>
      </Grid>

    </Grid>
  );
};

export default Home;