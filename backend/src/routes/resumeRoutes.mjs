import express from 'express';

const router = express.Router();

import * as auth from '../utils/auth.mjs';

import mongoose from 'mongoose';

router.get('/resume', auth.checkAuthenticated, async (req, res) => {
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

router.post('/resume', auth.checkAuthenticated, async (req, res) => {
  try{
    const updatedResume = req.body.resume;
    const Resume = mongoose.model('Resume');
    const resume = await Resume.findById(updatedResume._id);
    resume.name = updatedResume.name;
    resume.description = updatedResume.description;
    resume.dateOfCreation = Date.now();
    resume.materials = updatedResume.materials;
    await resume.save();
    res.status(200).json({ resume: resume });
  }
  catch(err){
    res.status(500).json({ message: err.message });
  }
});

export default router;