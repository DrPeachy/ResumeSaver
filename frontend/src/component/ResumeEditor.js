import React, { useRef } from "react";
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


const resumeKey = ['header', 'educations', 'experiences', 'skills'];
const resumeKeyToTitle = {
  'header': 'Header',
  'educations': 'Education',
  'experiences': 'Experience',
  'skills': 'Skill'
};

const EleItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  alignItems: 'flex-start',
  justifyContent: 'center',
}));

const timeToDate = (time) => {
  return time?.slice(0, 10);
};

const ResumeEditor = ({ outputResumeId }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  // const focusRef = useRef(null);
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
  useEffect(() => {
    setLoading(true);
    axios.get(`${baseUrl}/resume?id=${outputResumeId ?? ''}`)
      .then(response => {
        if (response.status === 200) {
          let newestResume = response.data.resume;
          if (newestResume == null) {
            newestResume = {
              _id: outputResumeId,
              header: [],
              educations: [],
              experiences: [],
              skills: []
            };
          }
          setResume({ ...resume, ...newestResume });
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   if (!focusRef.current) return;
  //   // save resume to backend
  //   axios.post(`${baseUrl}/resume`, { resume: resume })
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log(response.data);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [focusRef.current]);

  const handleOnBlur = (event) => {
    event.preventDefault();
        // save resume to backend
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


  const addSlot = (key) => {
    switch (key) {
      case 'header':
        const newHeader = {
          name: "",
          phone: "",
          email: "",
          link: "",
        };
        setResume({ ...resume, header: [...resume.header, newHeader] });
        break;
      case 'educations':
        const newEducationSlot = {
          institution: "",
          location: "",
          degree: "",
          major: "",
          minor: "",
          gpa: "",
          duration: {
            startDate: null,
            endDate: null
          },
        };
        setResume({ ...resume, educations: [...resume.educations, newEducationSlot] });
        break;
      case 'experiences':
        const newExperienceSlot = {
          title: "",
          type: "",
          organization: "",
          location: "",
          duration: {
            startDate: null,
            endDate: null
          },
          description: ""
        };
        setResume({ ...resume, experiences: [...resume.experiences, newExperienceSlot] });
        break;
      case 'skills':
        const newSkillSlot = {
          name: "",
          list: ""
        };
        setResume({ ...resume, skills: [...resume.skills, newSkillSlot] });
        break;
      default:
        break;
    }
  };

  const removeSlot = (key, index) => {
    switch (key) {
      case 'header':
        const header = [...resume.header];
        header.splice(index, 1);
        setResume({ ...resume, header: header });
        break;
      case 'educations':
        const educations = [...resume.educations];
        educations.splice(index, 1);
        setResume({ ...resume, educations: educations });
        break;
      case 'experiences':
        const experiences = [...resume.experiences];
        experiences.splice(index, 1);
        setResume({ ...resume, experiences: experiences });
        break;
      case 'skills':
        const skills = [...resume.skills];
        skills.splice(index, 1);
        setResume({ ...resume, skills: skills });
        break;
      default:
        break;
    }
  };

  const handleSlotChange = (event, key, index) => {
    event.preventDefault();
    const { name, value } = event.target;
    const list = [...resume[key]];
    if (name.includes('startDate') || name.includes('endDate')) {
      list[index].duration[name] = value;
    } else {
      list[index][name] = value;
    }
    setResume({ ...resume, [key]: list });
    // if (name != focusRef.current) {
    //   focusRef.current = name;
    // }
  };




  return (
    <Grid
      container
      flexDirection='column'
      gap={1}
    >
      {
        !loading && resume &&
        resumeKey.map((key) => {
          console.log(resume);
          console.log(resume[key]);
          return (
            <>
              <Grid
                item
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                flexDirection='row'
                component={EleItem}
              >
                <Typography
                  variant='body'
                  align="left"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {resumeKeyToTitle[key]}
                </Typography>
                <IconButton
                  onClick={() => addSlot(key)}
                >
                  <AddIcon />
                </IconButton>
              </Grid>
              {Object.entries(resume[key]).map(([name, value], index) => {

                return (
                  <Grid
                    container
                    flexDirection='column'
                    justifyContent='space-between'
                    key={name}
                    component={EleItem}
                  >
                    <Grid item
                      display='flex'
                      flexDirection='row'
                      justifyContent='space-between'
                      alignItems='center'
                      width='100%'
                    >
                      <Typography
                        variant="body1"
                      >
                        {`${resumeKeyToTitle[key]}-${index + 1}`}
                      </Typography>
                      <IconButton
                        onClick={() => removeSlot(key, index)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                    <Grid container
                      flexDirection='row'
                      justifyContent='flex-start'
                      alignItems='flex-start'
                      sm={12}
                      md={12}
                      lg={12}
                      gap={1}
                    >

                      {
                        Object.entries(value).map(([name, value]) => {
                          if (name === '_id') return null;
                          if (name === 'duration') {
                            return (
                              <Grid container
                                flexDirection='row'
                                justifyContent='flex-start'
                                alignItems='flex-start'
                                gap={1}
                                key={name}
                                sm={12}
                                md={12}
                                lg={12}
                              >
                                <Grid item
                                  component={TextField}
                                  name='startDate'
                                  label='Start Date'
                                  type="date"
                                  value={timeToDate(value.startDate)}
                                  variant="filled"
                                  fullWidth
                                  lg={4}
                                  onChange={(event) => handleSlotChange(event, key, index)}
                                  onBlur={handleOnBlur}
                                />
                                <Grid item
                                  component={TextField}
                                  name='endDate'
                                  label='End Date'
                                  type="date"
                                  value={timeToDate(value.endDate)}
                                  variant="filled"
                                  fullWidth
                                  lg={4}
                                  onChange={(event) => handleSlotChange(event, key, index)}
                                  onBlur={handleOnBlur}
                                />
                              </Grid>
                            )
                          }
                          if (name === 'description' || name === 'list') {
                            return (
                              <Grid item
                                key={name}
                                sm={12}
                                md={12}
                                lg={12}
                              >
                                <TextField
                                  name={name}
                                  label={name}
                                  value={value}
                                  variant="filled"
                                  size="small"
                                  fullWidth
                                  onChange={(event) => handleSlotChange(event, key, index)}
                                  onBlur={handleOnBlur}
                                  multiline
                                  maxRows={8}
                                />
                              </Grid>
                            )
                          }
                          
                          return (
                            <Grid item
                              key={name}
                              sm={5}
                              md={5}
                              lg={3.3}
                            >
                              <TextField
                                name={name}
                                label={name}
                                value={value}
                                variant="filled"
                                size="small"
                                onChange={(event) => handleSlotChange(event, key, index)}
                                onBlur={handleOnBlur}
                              />
                            </Grid>
                          )
                        })
                      }
                    </Grid>
                  </Grid>

                );

              })}
            </>
          );
        })
      }
    </Grid>
  )
};

export default ResumeEditor;