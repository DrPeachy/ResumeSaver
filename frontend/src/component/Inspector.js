import React from "react";
import { useEffect, useState, memo } from "react";
import { Button, Divider, Menu, Slide, Switch, Tooltip } from "@mui/material";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
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

const Inspector = memo(({ format, workspaceId, updateWorkspaceCallback }) => {
  const [formatData, setFormatData] = useState(format);
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
  const [collapseFlag, setCollapseFlag] = useState({
    general: false,
    header: true,
    education: true,
    experience: true,
    skill: true,
  });

  useEffect(() => {
    setFormatData(format);
  }, [format]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'S') {
        updateWorkspaceCallback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Update format data and send to server
  const handleFormatUpdate = (newFormatData) => {
    setFormatData(newFormatData);
    axios.post(`${baseUrl}/workspace/format`, { id: workspaceId, format: newFormatData })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          // updateWorkspaceCallback();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleFormatChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    handleFormatUpdate({
      ...formatData,
      [name]: newValue
    });
  };

  const handleToggleChange = (name) => (event, newValue) => {
    if (newValue !== null) {
      handleFormatUpdate({
        ...formatData,
        [name]: newValue
      });
    }
  };

  const toggleCollapse = (key) => {
    setCollapseFlag(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  return (
    <Grid container
      flexDirection='column'
      gap={0}
    >
      <Grid item
        display='flex'
        flexDirection='row'
        justifyContent='space-around'
        alignItems='flex-end'
        xs={12}
      >
        <Typography variant="h6" align="center"
          sx={{
            p: 1,
            m: 0,
          }}
        >
          INSPECTOR
        </Typography>
        <Button
          onClick={updateWorkspaceCallback}
          sx={{
            p: 1,
            m: 0,
          }}
        >
          <Typography variant="h6" align="center"
            color="secondary"
          >
            Apply
          </Typography>
          <Tooltip title="Apply the current format to your resume! (You can also do this by pressing Shift+Ctrl+S)">
            <HelpOutlineIcon 
              color="secondary"
              style={{ fontSize: 20, cursor: 'pointer' }} 
            />
          </Tooltip>
        </Button>

      </Grid>
      <Divider />
      {/* General */}
      <Grid container
        alignItems="center"
      >
        <IconButton onClick={() => toggleCollapse('general')}>
          <ExpandMoreIcon style={{ transform: collapseFlag['general'] ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </IconButton>
        <Typography variant="h6" align="left"
          sx={{
            fontWeight: 'bold',
          }}
        >
          General
        </Typography>
      </Grid>
      <Collapse in={!collapseFlag['general']}>
        {/* Font */}
        <FormControl
          size='small'
          margin="none"
          color="secondary"
          sx={{
            gap: 1,
            width: '100%',
          }}
        >
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
                value={formatData.font}
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
        {/* Margin */}
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
        {/* Line Spacing */}
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
        {/* Has Divider */}
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
        {/* Heading Size */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={2}>
            <Typography variant="body1" align="left">
              Heading Size:
            </Typography>
          </Grid>
          <Grid item lg={6.5}>
            <Slider
              aria-label="HeadingFontSize"
              getAriaValueText={''}
              name="headingFontSize"
              value={formatData.headingFontSize}
              color="secondary"
              onChange={handleFormatChange}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={11}
              max={14}
            />
          </Grid>
          <Grid item lg={2}>
            <Input
              value={formatData.headingFontSize}
              size="small"
              name="headingFontSize"
              onChange={handleFormatChange}
              inputProps={{
                step: 0.5,
                min: 11,
                max: 14,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
        {/* Heading Alignment */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={2}>
            <Typography variant="body1" align="left">
              Heading Alignment:
            </Typography>
          </Grid>
          <ToggleButtonGroup
            justifyContent='flex-end'
            color="secondary"
            value={formatData.headingAlignment}
            exclusive
            onChange={handleToggleChange('headingAlignment')}
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
        {/* Subheading Size */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={2}>
            <Typography variant="body1" align="left">
              Subheading Size:
            </Typography>
          </Grid>
          <Grid item lg={6.5}>
            <Slider
              aria-label="subheadingFontSize"
              getAriaValueText={''}
              name="subheadingFontSize"
              value={formatData.subheadingFontSize}
              color="secondary"
              onChange={handleFormatChange}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={11}
              max={14}
            />
          </Grid>
          <Grid item lg={2}>
            <Input
              value={formatData.subheadingFontSize}
              size="small"
              name="subheadingFontSize"
              onChange={handleFormatChange}
              inputProps={{
                step: 0.5,
                min: 11,
                max: 14,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
        {/* Subheading Alignment */}
        {/* <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={2}>
            <Typography variant="body1" align="left">
              Subheading Alignment:
            </Typography>
          </Grid>
          <ToggleButtonGroup
            justifyContent='flex-end'
            color="secondary"
            value={formatData.subheadingAlignment}
            exclusive
            onChange={handleToggleChange('subheadingAlignment')}
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
        </Grid> */}
        {/* Body Size */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={2}>
            <Typography variant="body1" align="left">
              Body Size:
            </Typography>
          </Grid>
          <Grid item lg={6.5}>
            <Slider
              aria-label="bodyFontSize"
              getAriaValueText={''}
              name="bodyFontSize"
              value={formatData.bodyFontSize}
              color="secondary"
              onChange={handleFormatChange}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={10}
              max={12}
            />
          </Grid>
          <Grid item lg={2}>
            <Input
              value={formatData.bodyFontSize}
              size="small"
              name="bodyFontSize"
              onChange={handleFormatChange}
              inputProps={{
                step: 0.5,
                min: 10,
                max: 12,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
        {/* Body Alignment */}
        {/* <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={4}>
            <Typography variant="body1" align="left">
              Body Alignment:
            </Typography>
          </Grid>
          <ToggleButtonGroup
            justifyContent='flex-end'
            color="secondary"
            value={formatData.bodyAlignment}
            exclusive
            onChange={handleToggleChange('bodyAlignment')}
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
        </Grid> */}
      </Collapse>



      <Divider />
      {/* Header */}
      <Grid container
        alignItems="center"
      >
        <IconButton onClick={() => toggleCollapse('header')}>
          <ExpandMoreIcon style={{ transform: collapseFlag['header'] ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </IconButton>
        <Typography variant="h6" align="left"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Header
        </Typography>
      </Grid>
      <Collapse in={!collapseFlag['header']}>
        {/* Name Size */}
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
        {/* Name Alignment */}
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
        {/* Info Size */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={3}>
            <Typography variant="body1" align="left">
              Info Size:
            </Typography>
          </Grid>
          <Grid item lg={6.5}>
            <Slider
              aria-label="InfoFontSize"
              getAriaValueText={''}
              name="infoFontSize"
              value={formatData.infoFontSize}
              color="secondary"
              onChange={handleFormatChange}
              valueLabelDisplay="auto"
              step={0.5}
              marks
              min={10}
              max={12}
            />
          </Grid>
          <Grid item lg={2}>
            <Input
              value={formatData.infoFontSize}
              size="small"
              name="infoFontSize"
              onChange={handleFormatChange}
              inputProps={{
                step: 0.5,
                min: 10,
                max: 12,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
        {/* Info Alignment */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={3}>
            <Typography variant="body1" align="left">
              Info Alignment:
            </Typography>
          </Grid>
          <ToggleButtonGroup
            justifyContent='flex-end'
            color="secondary"
            value={formatData.infoAlignment}
            exclusive
            onChange={handleToggleChange('infoAlignment')}
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
        {/* Info Divider */}
        <FormControl
          size='small'
          margin="none"
          color="secondary"
          sx={{
            gap: 1,
            width: '100%',
          }}
        >
          <Grid container
            gap={0.5}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item lg={2}>
              <Typography variant="body1" align="left">
                Info Divider:
              </Typography>
            </Grid>
            <Grid item lg={3}>
              <Select
                name="infoDivider"
                value={formatData.infoDivider}
                fullWidth
                onChange={handleFormatChange}
              >
                <MenuItem value={' • '}>•</MenuItem>
                <MenuItem value={' | '}>|</MenuItem>
              </Select>
            </Grid>
          </Grid>


        </FormControl>
      </Collapse>


      <Divider />
      {/* Education */}
      <Grid container
        alignItems="center"
      >
        <IconButton onClick={() => toggleCollapse('education')}>
          <ExpandMoreIcon style={{ transform: collapseFlag['education'] ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </IconButton>
        <Typography variant="h6" align="left"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Education
        </Typography>
      </Grid>
      <Collapse in={!collapseFlag['education']}>
        {/* Institution Font Style */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={4}>
            <Typography variant="body1" align="left">
              Institution Font Style:
            </Typography>
          </Grid>
          <ToggleButtonGroup
            justifyContent='flex-end'
            color="secondary"
            value={formatData.institutionFontStyle}
            exclusive
            onChange={handleToggleChange('institutionFontStyle')}
          >
            <ToggleButton
              value="regular"
              size="small"
            >
              <DoNotDisturbIcon />
            </ToggleButton>
            <ToggleButton
              value="bold"
              size="small"
            >
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton
              value="italic"
              size="small"
            >
              <FormatItalicIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        {/* Education Bullet Point */}
        <FormControl
          size='small'
          margin="none"
          color="secondary"
          sx={{
            gap: 1,
            width: '100%',
          }}
        >
          <Grid container
            gap={0.5}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item lg={4}>
              <Typography variant="body1" align="left">
                Education Bullet Point:
              </Typography>
            </Grid>
            <Grid item lg={3}>
              <Select
                name="educationBulletPoint"
                value={formatData.educationBulletPoint}
                fullWidth
                onChange={handleFormatChange}
              >
                <MenuItem value={'   '}>None</MenuItem>
                <MenuItem value={' • '}>•</MenuItem>
                <MenuItem value={' - '}>-</MenuItem>
              </Select>
            </Grid>
          </Grid>


        </FormControl>
      </Collapse>


      <Divider />
      {/* Experience */}
      <Grid container
        alignItems="center"
      >
        <IconButton onClick={() => toggleCollapse('experience')}>
          <ExpandMoreIcon style={{ transform: collapseFlag['experience'] ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </IconButton>
        <Typography variant="h6" align="left"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Experience
        </Typography>
      </Grid>
      <Collapse in={!collapseFlag['experience']}>
        {/* Title Font Style */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={4}>
            <Typography variant="body1" align="left">
              Title Font Style:
            </Typography>
          </Grid>
          <ToggleButtonGroup
            justifyContent='flex-end'
            color="secondary"
            value={formatData.titleFontStyle}
            exclusive
            onChange={handleToggleChange('titleFontStyle')}
          >
            <ToggleButton
              value="regular"
              size="small"
            >
              <DoNotDisturbIcon />
            </ToggleButton>
            <ToggleButton
              value="bold"
              size="small"
            >
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton
              value="italic"
              size="small"
            >
              <FormatItalicIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        {/* Organization Font Style */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={4}>
            <Typography variant="body1" align="left">
              Organization Font Style:
            </Typography>
          </Grid>
          <ToggleButtonGroup
            justifyContent='flex-end'
            color="secondary"
            value={formatData.organizationFontStyle}
            exclusive
            onChange={handleToggleChange('organizationFontStyle')}
          >
            <ToggleButton
              value="regular"
              size="small"
            >
              <DoNotDisturbIcon />
            </ToggleButton>
            <ToggleButton
              value="bold"
              size="small"
            >
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton
              value="italic"
              size="small"
            >
              <FormatItalicIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        {/* Experience Bullet Point */}
        <FormControl
          size='small'
          margin="none"
          color="secondary"
          sx={{
            gap: 1,
            width: '100%',
            p: 0,
            m: 0,
          }}
        >
          <Grid container
            gap={0.5}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item lg={4}>
              <Typography variant="body1" align="left">
                Experience Bullet Point:
              </Typography>
            </Grid>
            <Grid item lg={3}>
              <Select
                name="experienceBulletPoint"
                value={formatData.experienceBulletPoint}
                fullWidth
                onChange={handleFormatChange}
              >
                <MenuItem value={'   '}>None</MenuItem>
                <MenuItem value={' • '}>•</MenuItem>
                <MenuItem value={' - '}>-</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </FormControl>
      </Collapse>

      <Divider />
      {/* Skill */}
      <Grid container
        alignItems="center"
      >
        <IconButton onClick={() => toggleCollapse('skill')}>
          <ExpandMoreIcon style={{ transform: collapseFlag['skill'] ? 'rotate(0deg)' : 'rotate(180deg)' }} />
        </IconButton>
        <Typography variant="h6" align="left"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Skill
        </Typography>
      </Grid>
      <Collapse in={!collapseFlag['skill']}>
        {/* Skill Title Style */}
        <Grid container
          gap={0.5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item lg={4}>
            <Typography variant="body1" align="left">
              Skill Title Style:
            </Typography>
          </Grid>
          <ToggleButtonGroup
            justifyContent='flex-end'
            color="secondary"
            value={formatData.skillTitleStyle}
            exclusive
            onChange={handleToggleChange('skillTitleStyle')}
          >
            <ToggleButton
              value="regular"
              size="small"
            >
              <DoNotDisturbIcon />
            </ToggleButton>
            <ToggleButton
              value="bold"
              size="small"
            >
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton
              value="italic"
              size="small"
            >
              <FormatItalicIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Collapse>
    </Grid>
  );
});

export default Inspector;
