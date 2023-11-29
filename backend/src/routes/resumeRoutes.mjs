import express from 'express';

const router = express.Router();

import * as auth from '../utils/auth.mjs';

import mongoose from 'mongoose';
const User = mongoose.model("User");
const Resume = mongoose.model('Resume');


router.get('/resume', auth.checkAuthenticated, async (req, res) => {
  try{

    const user = await User.findOne({ username: res.locals.currentUser });
    let id = null;
    if(!req.query.id){
      // get recent resume
      res.status(404).json({ message: 'No resume found' });
    }else{
      id = req.query.id;
      user.recentResumeId = id;
    }
    const resume = await Resume.findById(id);
    res.status(200).json({ resume: resume });
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
});

router.post('/resume', auth.checkAuthenticated, async (req, res) => {
  try{
    const updatedResume = req.body.resume;
    const resume = await Resume.findById(updatedResume._id);
    resume.header = updatedResume.header;
    resume.educations = updatedResume.educations;
    resume.experiences = updatedResume.experiences;
    resume.projects = updatedResume.projects;
    resume.achievements = updatedResume.achievements;
    resume.skills = updatedResume.skills;
    await resume.save();
    res.status(200).json({ resume: resume });
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
});


router.get('/test', async (req, res) => {
  try{
    const id = req.query.id;
    const Resume = mongoose.model('Resume');
    const resume = await Resume.findById(id);
    res.status(200).json({ resume: resume });
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
});


export default router;