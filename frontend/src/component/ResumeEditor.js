import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Icon, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const EleItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  alignItems: 'flex-start',
  justifyContent: 'center',
}));

const EduSlotsToForm = ({ educationSlots, handleEducationSlotChange, removeEducationSlot }) => {
  console.log(educationSlots);
  const Inputs = (educationSlot, index) => {
    console.log(educationSlot);
    console.log('0-------')
    console.log(Object.entries(educationSlot));
    return Object.entries(educationSlot.educationSlot).map(([key, value]) => {
      console.log(key, value);
      return (
        <Grid item
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="100%"
          key={key}
        >
          <TextField
            margin="none"
            id={key}
            label={key}
            name={key}
            autoFocus
            defaultValue={value}
            variant="filled"
            size="small"
            onChange={(event) => handleEducationSlotChange(event, index)}
          />
        </Grid>
      );
    });
  };
  return educationSlots.map((educationSlot, index) => {
    return (
      <Grid item
        display="flex"
        flexDirection="row"
      >
        <Inputs educationSlot={educationSlot} index={index} />
        <IconButton onClick={() => removeEducationSlot(index)}>
          <RemoveIcon />
        </IconButton>
      </Grid>
    );
  });
};



const ResumeEditor = ({ outputResumeId }) => {
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const [resumeHeader, setResumeHeader] = useState(null);
  const [educationSlots, setEducationSlots] = useState(null);
  const [experienceSlots, setExperienceSlots] = useState(null);
  const [skills, setSkills] = useState(null);


  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}/resume?id=${outputResumeId ?? ''}`)
      .then(response => {
        if (response.status === 200) {
          const resume = response.data.resume;
          setResume(resume);
          setResumeHeader(resume.header);
          setEducationSlots(resume.educations);
          setExperienceSlots(resume.experiences);
          setSkills(resume.skills);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addEducationSlot = () => {
    const newEducationSlot = {
      institution: "",
      degree: "",
      major: "",
      minor: "",
      gpa: "",
      duration: {
        startDate: null,
        endDate: null
      },
    };
    setEducationSlots([...educationSlots, newEducationSlot]);
  }

  const addExperienceSlot = () => {
    const newExperienceSlot = {
      title: "",
      type: "",
      organization: "",
      location: "",
      duration: {
        startDate: null,
        endDate: null
      },
      description: []
    };
    setExperienceSlots([...experienceSlots, newExperienceSlot]);
  }

  const addSkillSlot = () => {
    const newSkillSlot = {
      name: "",
      list: []
    };
    setSkills([...skills, newSkillSlot]);
  }

  const handleEducationSlotChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...educationSlots];
    list[index][name] = value;
    setEducationSlots(list);
  }

  const handleExperienceSlotChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...experienceSlots];
    list[index][name] = value;
    setExperienceSlots(list);
  }

  const handleSkillSlotChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...skills];
    list[index][name] = value;
    setSkills(list);
  }

  const handleResumeHeaderChange = (event) => {
    const { name, value } = event.target;
    setResumeHeader({ ...resumeHeader, [name]: value });
  }

  const removeEducationSlot = (index) => {
    const list = [...educationSlots];
    list.splice(index, 1);
    setEducationSlots(list);
  }

  const removeExperienceSlot = (index) => {
    const list = [...experienceSlots];
    list.splice(index, 1);
    setExperienceSlots(list);
  }

  const removeSkillSlot = (index) => {
    const list = [...skills];
    list.splice(index, 1);
    setSkills(list);
  }

  const getResume = () => {
    const resume = {
      header: resumeHeader,
      educations: educationSlots,
      experiences: experienceSlots,
      skills: skills
    };
    return resume;
  }

  const handleResumeSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
  };



  return (
    <Box component="form" onSubmit={handleResumeSubmit} noValidate>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        padding={0}
        margin={0}
        gap={1}

      >
        <Grid item
          component={EleItem}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="body1"
            align="left"
          >
            Header
          </Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item
          component={EleItem}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          
          <Typography variant="body1"
            align="left"
          >
            Education
          </Typography>
          <IconButton
            onClick={addEducationSlot}
          >
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item
          component={EleItem}
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          {!loading && educationSlots && <EduSlotsToForm educationSlots={educationSlots} handleEducationSlotChange={handleEducationSlotChange} removeEducationSlot={removeEducationSlot} />}
        </Grid>
        <Grid item
          component={EleItem}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="body1"
            align="left"
          >
            Experience
          </Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item
          component={EleItem}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="body1"
            align="left"
          >
            Skills
          </Typography>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Grid>
        <Button type="submit" variant="contained">
          Save Resume
        </Button>
      </Grid>
    </Box>
  );
};

export default ResumeEditor;