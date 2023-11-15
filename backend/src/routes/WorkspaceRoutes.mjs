import express from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

import * as auth from '../utils/auth.mjs';

import mongoose from 'mongoose';
import exp from 'constants';
const User = mongoose.model('User');
const Workspace = mongoose.model('Workspace');
const Resume = mongoose.model('Resume');

const formPDF = (doc, resume) => {
  doc.fontSize(25).text('test');
}

// router.get('/workspace/get-recent', auth.checkAuthenticated, async (req, res) => {
//   try {
//     const user = await User.findOne({ username: res.locals.currentUser });
//     const recentWorspaceId = user.recentWorspaceId;
//     const recentWorkspace = await Workspace.findById(recentWorspaceId);
//     res.status(200).json({ recentWorkspace: recentWorkspace });
//   }
//   catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get('/workspace', auth.checkAuthenticated, async (req, res) => {
  const id = req.query.id;
  console.log(`id: ${id}`);
  const user = await User.findOne({ username: res.locals.currentUser });
  if (id != '') {
    user.recentWorkspaceId = id;
    await user.save();
    const workspace = await Workspace.findById(id);
    res.status(200).json({ workspace: workspace });
  } else {
    const recentWorkspaceId = user.recentWorkspaceId;
    const recentWorkspace = await Workspace.findById(recentWorkspaceId);
    res.status(200).json({ workspace: recentWorkspace });
  }
});



router.get('/workspace/get-latest-pdf', auth.checkAuthenticated, async (req, res) => {
  try{
    // get workspace id
    const workspaceId = req.query.id;
    const workspace = await Workspace.findById(workspaceId);
    // get resume
    const resumeId = workspace.outputResume;
    const resume = await Resume.findById(resumeId);
    //get user id
    const userId = res.locals.currentUser;
    // config filename
    const filename = `${userId}_${workspaceId}_${resumeId}.pdf`;
    const filepath = path.join(__dirname, '..', 'public', 'pdfs', filename);
    
    // form pdf
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filepath));
    formPDF(doc, resume);
    doc.end();

    // return url
    res.status(200).json({ url: `pdfs/${filename}` });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
});


export default router;