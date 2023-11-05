import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IconButton } from "@mui/material";


const WorkspaceCard = ({ key, workspace, handleDelete }) => {
  return (
    <Card
      sx={{
        minWidth: 220,
        minHeight: 220,
        margin: 2,
        padding: 2,
        textAlign: "left",
        backgroundColor: "#f5f5f5",
      }}
    
    >
      <CardContent>
        <h3>{workspace.name}</h3>
        <p>{workspace.description}</p>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => handleDelete(workspace._id)}>
          <i className="fas fa-trash"></i>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default WorkspaceCard;