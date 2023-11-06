import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { Dialog, IconButton, Menu } from "@mui/material";


const WorkspaceCard = ({ workspace, handleEdit, handleDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editOpen, setEditOpen] = React.useState(false);

  useEffect(() => {
    console.log(editOpen);
  }, [editOpen]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCardMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  }

  const handleEditClose = () => {
    setEditOpen(false);
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();
    handleEdit(event, workspace._id);
  }

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  return (
    <Card
      sx={{
        minWidth: 220,
        minHeight: 220,
        maxWidth: 220,
        maxHeight: 220,
        margin: 2,
        padding: 2,
        textAlign: "left",
        backgroundColor: "#f5f5f5",
      }}

    >
      <CardHeader
        action={
          <>
            <IconButton
              aria-label="settings"
              aria-controls="workspace-menu-btn"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="workspace-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCardMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCardMenuClose();
                  handleDelete(workspace._id);
                }}
              >
                Delete
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCardMenuClose();
                  handleEditOpen();
                }}
              >
                Edit
              </MenuItem>

            </Menu>
          </>
        }
        title={workspace.name}
        subheader={workspace.dateOfCreation? "Last Change by: " + formatDate(workspace.dateOfCreation) : "No Date"}
      />
      <Dialog open={editOpen} onClose={handleEditClose}>
        <form onSubmit={handleEditSubmit}>
          <DialogTitle>Edit Workspace</DialogTitle>
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
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
      <CardContent
        sx={{
          pt: 0,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            wordWrap: "break-word",
          }}

        >
          {workspace.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WorkspaceCard;