import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WorkspaceCard from "./WorkspaceCard";
import { Button, Container, Dialog, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const Dashboard = () => {
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState(null);
  const [open, setOpen] = useState(false);
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/dashboard`)
      .then(response => {
        if (response.status === 200) {
          setWorkspaces(response.data.workspaces);
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          navigate('/login', { state: { isWarning: "unauthorized" } });
        } else {
          console.log(error);
        }
      });
  }, []);


  const handleCreateOpen = () => {
    setOpen(true);
  }

  const handleCreateClose = () => {
    setOpen(false);
  }

  // form control
  const handleDeleteSubmit = (id) => {
    axios.post(`${baseUrl}/dashboard/del`, { id: id })
      .then(response => {
        if (response.status === 200) {
          const newWorkspaces = workspaces.filter(workspace => workspace._id !== id);
          setWorkspaces(newWorkspaces);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    axios.post(`${baseUrl}/dashboard/create`, data)
      .then(response => {
        if (response.status === 200) {
          const newWorkspaces = [...workspaces, response.data.workspace];
          setWorkspaces(newWorkspaces);
          setOpen(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleEditSubmit = (e, key, cb) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    data.id = key;
    axios.post(`${baseUrl}/dashboard/edit`, data)
      .then(response => {
        if (response.status === 200){
          const updatedWorkspaces = workspaces.map(workspace => {
            if (workspace._id === key){
              return response.data.workspace;
            }
            return workspace;
          });
          setWorkspaces(updatedWorkspaces);
          cb();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <Container component="main" maxWidth="xl">

      <Typography component="h1" variant="h4">
        Dashboard
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        pt={3}
        gap={3}
      >
        {workspaces ? workspaces.map(workspace => (
          <WorkspaceCard
            workspace={workspace}
            handleEdit={handleEditSubmit}
            handleDelete={handleDeleteSubmit}
          />
        )) :
          <Typography component="h1" variant="h2">
            No Workspaces, Create One!
          </Typography>
        }
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16 }}
        onClick={handleCreateOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleCreateClose}>
        <form onSubmit={handleCreateSubmit}>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Workspace Name"
              name="name"
              variant="standard"
              inputProps={{ maxLength: 14 }}
              fullWidth
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              name="description"
              variant="standard"
              inputProps={{ maxLength: 100 }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>

    </Container>

  );
}

export default Dashboard;
