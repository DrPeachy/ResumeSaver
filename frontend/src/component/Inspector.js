import React from "react";
import { useEffect, useState } from "react";
import { Divider, Menu, Slide, Switch } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import axios from "axios";

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 1.15,
    label: '1.15',
  },
  {
    value: 1.5,
    label: '1.5',
  },
  {
    value: 2,
    label: '2',
  },
];

const valueText = function (value) {
  if (value === 2) {
    return 'double';
  } else if (value === 1.5) {
    return 'single';
  } else {
    return value;
  }
}

const valueLabelFormat = function (value) {
  const mark = marks.find(mark => mark.value === value);
  return mark ? mark.label : '';
}

const Inspector = ({ format, workspaceId }) => {
  const [font, setFont] = useState(format.font);
  const [formatData, setFormatData] = useState(format);

  const handleFormatChange = (event) => {
    const { name, value, type, checked } = event.target;

    const newValue = type === 'checkbox' ? checked : value;

    setFormatData({
      ...formatData,
      [name]: newValue
    });
  };

  const handleToggleChange = (name) => (event, newValue) => {
    if (newValue !== null) {
      setFormatData({
        ...formatData,
        [name]: newValue
      });
    }
  };

  return (
    <Grid container
      flexDirection='column'
      gap={1}
    >
      <Grid item xs={12}>
        <Typography variant="h6" align="center"
          sx={{
            pt: 1
          }}
        >
          Inspector
        </Typography>

      </Grid>
      <Divider />
      <Typography variant="h6" align="left"
        sx={{
          fontWeight: 'bold',
        }}
      >
        General
      </Typography>
      <FormControl
        size='small'
        margin="none"
        color="secondary"
        sx={{
          gap: 1,
        }}
      >
        {/* <InputLabel>Font</InputLabel> */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={2}>
            <Typography variant="body1" align="left">
              Font:
            </Typography>
          </Grid>
          <Grid item lg={7.5}>
            <Select
              name="font"
              value={format.font}
              defaultValue={format.font}
              fullWidth
              onChange={handleFormatChange}
            >
              <MenuItem value={'Times-Roman'}>Times Roman</MenuItem>
              <MenuItem value={'OpenSans'}>OpenSans</MenuItem>
              <MenuItem value={'LibreBaskerville'}>LibreBaskerville</MenuItem>
              <MenuItem value={'Roboto'}>Roboto</MenuItem>
              <MenuItem value={'Lora'}>Lora</MenuItem>
              <MenuItem value={'Tinos'}>Tinos</MenuItem>
              <MenuItem value={'EBGaramond'}>EBGaramond</MenuItem>
              <MenuItem value={'Carlito'}>Carlito</MenuItem>
              <MenuItem value={'Arimo'}>Arimo</MenuItem>
            </Select>
          </Grid>
        </Grid>


      </FormControl>
      <Grid container
        gap={0.5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item lg={2}>
          <Typography variant="body1" align="left">
            Margin:
          </Typography>
        </Grid>
        <Grid item lg={6.5}>
          <Slider
            aria-label="Margin"
            getAriaValueText={''}
            name="margin"
            value={formatData.margin}
            color="secondary"
            onChange={handleFormatChange}
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0.5}
            max={1}
          />
        </Grid>
        <Grid item lg={2}>
          <Input
            value={formatData.margin}
            size="small"
            name="margin"
            onChange={handleFormatChange}
            inputProps={{
              step: 0.1,
              min: 0.5,
              max: 1,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>

      <Grid container
        gap={0.5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item lg={2}>
          <Typography variant="body1" align="left">
            Line Spacing:
          </Typography>
        </Grid>
        <Grid item lg={9}>
          <Slider
            aria-label="lineSpacing"
            name="lineSpacing"
            value={formatData.lineSpacing}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valueText}
            getAriaLabel={valueText}
            color="secondary"
            onChange={handleFormatChange}
            step={null}
            min={1}
            max={2}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </Grid>

      </Grid>

      <Grid container
        gap={0.5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item lg={4}>
          <Typography variant="body1" align="left">
            Has Divider:
          </Typography>
        </Grid>
        <Switch
          checked={formatData.hasDivider}
          onChange={handleFormatChange}
          name="hasDivider"
          color="secondary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />

      </Grid>

      <Divider />
      <Typography variant="h6" align="left"
        sx={{
          fontWeight: 'bold',
        }}
      >
        Header
      </Typography>
      <Grid container
        gap={0.5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item lg={2}>
          <Typography variant="body1" align="left">
            Name Size:
          </Typography>
        </Grid>
        <Grid item lg={6.5}>
          <Slider
            aria-label="NameFontSize"
            getAriaValueText={''}
            name="nameFontSize"
            value={formatData.nameFontSize}
            color="secondary"
            onChange={handleFormatChange}
            valueLabelDisplay="auto"
            step={0.5}
            marks
            min={18}
            max={24}
          />
        </Grid>
        <Grid item lg={2}>
          <Input
            value={formatData.nameFontSize}
            size="small"
            name="nameFontSize"
            onChange={handleFormatChange}
            inputProps={{
              step: 0.5,
              min: 18,
              max: 24,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>

      <Grid container
        gap={0.5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item lg={2}>
          <Typography variant="body1" align="left">
            Name Alignment:
          </Typography>
        </Grid>
        <ToggleButtonGroup
          justifyContent='flex-end'
          color="secondary"
          value={formatData.nameAlignment}
          exclusive
          onChange={handleToggleChange('nameAlignment')}
        >
          <ToggleButton
            value="left"
            size="small"
          >
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton
            value="center"
            size="small"
          >
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton
            value="right"
            size="small"
          >
            <FormatAlignRightIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Inspector;
