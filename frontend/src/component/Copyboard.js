import React from "react";
import { useEffect, useState, memo } from "react";
import axios from "axios";

import { ButtonGroup, Chip, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Container, Typography } from "@mui/material";


const Copyboard = memo(({ chips, workspaceId }) => {
  const [chipsData, setChipsData] = useState(chips);
  const [loading, setLoading] = useState(false);
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;

  useEffect(() => {
    setChipsData(chips);
  }, [chips]);


  const handleMaterialUpdate = (newMaterial) => {
    setLoading(true);
    axios.post(`${baseUrl}/workspace/material`, { id: workspaceId, materal: newMaterial })
      .then(response => {
        if (response.status === 200) {

        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleClick = (info) => {
    navigator.clipboard.writeText(info);
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
        {/* <ButtonGroup color='secondary'> */}
        <Button variant="outlined">
          Insert PDF
        </Button>
        <Button variant="outlined">
          Insert WORD
        </Button>
        {/* </ButtonGroup> */}
      </Grid>

      <Grid item
        display='flex'
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={1}
      >
        <Chip label='ssssssssssssssssssssssssssssssssssssssssssssssssssss'></Chip>
        <Chip label='ssssssssssssssssssssssssssssssssssssss'></Chip>
        <Chip label='sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'></Chip>
        <Chip label='ssssssssssssssssssssssssssssssssssssss'></Chip>
      </Grid>

    </Grid>
  );

});

export default Copyboard;