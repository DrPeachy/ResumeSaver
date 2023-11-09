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

const timeToDate = (time) => {
  return time?.slice(0, 10);
};

const SlotsToForm = ({ slots, handleChange, handleRemove, slotkey }) => {
  const DateInput = (props) => {
    const { label, value, id, key, name, onChange } = { ...props };
    return (
      <TextField
        margin="none"
        label={label}
        type="date"
        name={name}
        id={id}
        key={key}
        value={value}
        variant="filled"
        size="small"
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    );
  };

  const Inputs = ({ slot, index }) => {
    return Object.entries(slot).map(([key, value]) => {
      console.log(key, value);
      if (key === '_id') return null;
      if (key === 'duration') {
        return (
          <Grid item
            width="100%"
            key={`${slotkey}-${key}-${index}`}
          >
            <DateInput
              label="Start Date"
              id={`${slotkey}-startDate-${index}`}
              key={`${slotkey}-startDate-${index}`}
              name="startDate"
              value={timeToDate(value.startDate)}
              onChange={(event) => handleChange(event, index)}
            />
            <DateInput
              label="End Date"
              id={`${slotkey}-endDate-${index}`}
              key={`${slotkey}-endDate-${index}`}
              name="endDate"
              value={timeToDate(value.endDate)}
              onChange={(event) => handleChange(event, index)}
            />
          </Grid>
        );
      }
      return (
        <TextField
          margin="none"
          id={`${slotkey}-${key}-${index}`}
          key={`${slotkey}-${key}-${index}`}
          label={key}
          name={key}
          defaultValue={value}
          variant="filled"
          size="small"
          onChange={(event) => handleChange(event, index)}
        />
      );
    });
  };
  console.log(slots);
  return slots.map((slot, index) => {
    return (
      <Grid item
        key={`${slotkey}-${index}`}
        display="flex"
        flexDirection="column"
      >
        {/* <Typography variant="h5" align="left">
          {index + 1}
        </Typography> */}
        <Inputs slot={slot} index={index} />
        <IconButton onClick={() => handleRemove(index)}>
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
    event.preventDefault();
    const { name, value } = event.target;
    const list = [...educationSlots];
    if (name.includes('startDate') || name.includes('endDate')) {
      list[index].duration[name] = value;
    } else {
      list[index][name] = value;
    }
    setEducationSlots(list);
  }

  const handleExperienceSlotChange = (event, index, field) => {
    const { name, value } = event.target;
    const list = [...experienceSlots];
    if (field.includes('startDate') || field.includes('endDate')) {
      list[index].duration[field] = value;
    } else {
      list[index][field] = value;
    }
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
      _id: outputResumeId,
      header: resumeHeader,
      educations: educationSlots,
      experiences: experienceSlots,
      skills: skills
    };
    return resume;
  }

  const handleResumeSubmit = (event) => {
    event.preventDefault();
    const resume = getResume();
    console.log(resume);
    axios.post(`${baseUrl}/resume`, { resume: resume })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };



  return (
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
        {!loading &&
          educationSlots &&
          <SlotsToForm
            slots={educationSlots}
            handleChange={handleEducationSlotChange}
            handleRemove={removeEducationSlot}
            slotkey={"education"}
          />
        }
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
      <Button type="submit" variant="contained"
        onClick={handleResumeSubmit}
      >
        Save Resume
      </Button>
    </Grid>

  );
};

export default ResumeEditor;