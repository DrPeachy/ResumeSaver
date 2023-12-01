import React from "react";
import { useEffect, useState, useCallback, memo, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import { ButtonGroup, Chip, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Container, Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Grow from '@mui/material/Grow';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

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
        Upload .pdf File
      </Button>
    </div>
  );
};


const Copyboard = memo(({ workspaceId }) => {
  const [chipsData, setChipsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState('');
  const previewOpen = Boolean(anchorEl);
  const [popoverIndex, setPopoverIndex] = useState(-1);
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  useEffect(() => {
    fetchChips();
  }, []);


  const handlePopoverOpen = (event, chipContent, index) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent(chipContent);
    setPopoverIndex(index);
  };

  const handlePopoverClose = (e, index) => {
    if (index !== popoverIndex) {
      return;
    }
    setPopoverIndex(-1);
    setAnchorEl(null);
    setPopoverContent('');
  };


  const fetchChips = () => {
    setLoading(true);
    axios.get(`${baseUrl}/workspace/material?id=${workspaceId}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          setChipsData(response.data.materials);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

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
          fetchChips();
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
    setShowCopyAlert(true);
  };

  const handleDelete = (index) => {
    const newChips = [...chipsData];
    newChips.splice(index, 1);
    setChipsData(newChips);
    handleMaterialUpdate(newChips);

  };

  const handleDeleteAll = () => {
    setChipsData([]);
    handleMaterialUpdate([]);
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
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <ButtonGroup color='secondary'>
          <FileUploadButton onUpload={handleFileUpload} />
          <Button variant="outlined" color="secondary"
            onClick={handleDeleteAll}
          >
            <DeleteSweepIcon />
          </Button>
        </ButtonGroup>
        <Tooltip
          title={
            <Fragment>
              1. Add materials to Copyboard below by hitting 'UPLOAD .PDF FILE' and select the existing PDF file you have<br />
              2. Delete one or all material by hitting the trash bin button<br />
              3. Click on the material to copy it to your clipboard!<br />
            </Fragment>
          }
        >
          <HelpOutlineIcon
            color="secondary"
            style={{ fontSize: 20, cursor: 'pointer' }}
          />
        </Tooltip>
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
              // height: 'auto',
              // '& .MuiChip-label': {
              //   display: 'block',
              //   whiteSpace: 'normal',
              // },
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              textAlign: 'left',
            }}
            key={index}
            label={chip}
            onClick={() => handleClick(chip)}
            onDelete={() => handleDelete(index)}
            onMouseEnter={(e) => handlePopoverOpen(e, chip, index)}
            onMouseLeave={(e) => handlePopoverClose(e, index)}
            deleteIcon={<DeleteIcon />}
          />
        ))}
      </Grid>

      <Popover
        sx={{
          pointerEvents: 'none',
        }}
        open={previewOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: window.innerHeight / 2,
          left: window.innerWidth / 2
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        disableRestoreFocus
      >
        <Typography sx={{ p: 2 }}>{popoverContent}</Typography>
      </Popover>

      {showCopyAlert && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={showCopyAlert}
          autoHideDuration={3000}
          TransitionComponent={Grow}
          onClose={() => setShowCopyAlert(false)}
        >
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            Content copied to clipboard!
          </Alert>
        </Snackbar>
      )}
    </Grid>
  );

});

export default Copyboard;