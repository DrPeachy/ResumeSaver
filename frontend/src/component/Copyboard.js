import React from "react";
import { useEffect, useState, useCallback, memo } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import { ButtonGroup, Chip, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Container, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploadButton = ({ onUpload }) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    onUpload(acceptedFiles[0]);
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant="outlined" color="secondary" startIcon={<CloudUploadIcon />}>
        Upload File(.pdf, .docx, .doc)
      </Button>
    </div>
  );
};


const Copyboard = memo(({ chips, workspaceId }) => {
  const [chipsData, setChipsData] = useState(chips);
  const [loading, setLoading] = useState(false);
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  useEffect(() => {
    setChipsData(chips);
  }, [chips]);

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', workspaceId);
    
    // Upload file to the server
    axios.post(`${baseUrl}/workspace/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
      }
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleMaterialUpdate = (newMaterial) => {
    setLoading(true);
    axios.post(`${baseUrl}/workspace/material`, { id: workspaceId, materials: newMaterial })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleClick = (info) => {
    navigator.clipboard.writeText(info);
  };

  const handleDelete = (index) => {
    const newChips = [...chipsData];
    newChips.splice(index, 1);
    setChipsData(newChips);
    handleMaterialUpdate(newChips);

  };


  return (
    <Grid Container
      flexDirection="column"
      width='100%'
      justifyContent='space-between'
      alignItems='flex-start'
    >
      <Grid item
        display='flex'
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <ButtonGroup color='secondary'>
          <FileUploadButton onUpload={handleFileUpload} />
        </ButtonGroup>
      </Grid>

      <Grid item
        display='flex'
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={1}
      >
        {chipsData.map((chip, index) => (
          <Chip
            sx={{
              height: 'auto',
              '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'normal',
              },
              textAlign: 'left',
            }}
            key={index}
            label={chip}
            onClick={() => handleClick(chip)}
            onDelete={() => handleDelete(index)}
            deleteIcon={<DeleteIcon />}
          />
        ))}
      </Grid>

    </Grid>
  );

});

export default Copyboard;