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

const dateToString = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
}

const formPDF = (doc, resume) => {
  const header = resume.header[0] ?? { phone: '', email: '', link: '' };
  const { educations, experiences, skills } = resume;
  doc.font('Times-Roman');

  // header
  doc.fontSize(20).text(header.name, { align: 'center' });
  doc.moveDown();
  doc.fontSize(15).text(`${header.phone} • ${header.email} • ${header.link}`, {
    align: 'center'
  });
  doc.moveDown();

  // education
  doc.fontSize(15).text('Education', {
    align: 'left'
  });
  doc.moveDown();
  for (const education of educations) {
    doc
      .font('Times-Bold')
      .fontSize(12)
      .text(`${education.institution}${education.location ? `, ${education.location}` : ''}`,
        { align: 'left' });
      // .font('Times-Roman')
      // .fontSize(12)
      // .text(education.location ? `, ${education.location}` : '',
      //   { align: 'left' });
    doc.moveUp();
    // doc
    // .font('Times-Roman')
    // .fontSize(12)
    // .text(education.location ? `, ${education.location}` : '',
    //   { align: 'left' });

    doc
      .font('Times-Roman')
      .fontSize(12)
      .text(
        `${dateToString(education.duration.startDate)}${education.duration.endDate ? `-${dateToString(education.duration.endDate)}` : ''}`,
        { align: 'right' }
      );
    doc.moveDown();

    doc
      .font('Times-Roman')
      .fontSize(12)
      .text(`${education.degree} in ${education.major}${education.minor ? `, minor in ${education.minor}` : ''}`,
        { align: 'left' }
      );
    doc.moveDown();
    doc
      .font('Times-Roman')
      .fontSize(12)
      .text(`GPA: ${education.gpa}`, { align: 'left' });
    doc.moveDown();

  }

  // experience
  doc.fontSize(15).text('Experience', {
    align: 'left'
  });
  doc.moveDown();
  for (const experience of experiences) {
    doc
      .font('Times-Bold')
      .fontSize(12)
      .text(`${experience.title}, ${experience.organization}, ${experience.location} `, { align: 'left' });
    doc.moveUp();
    doc
      .font('Times-Roman')
      .fontSize(12)
      .text(
        `${dateToString(experience.duration.startDate)}${experience.duration.endDate ? `-${dateToString(experience.duration.endDate)}` : ''}`,
        { align: 'right' }
      );
    doc.moveDown();
    // split description by newline
    const description = experience.description.split('\n');
    for (const line of description) {
      doc.fontSize(12).text(`• ${line}`, {
        align: 'left'
      });
      doc.moveDown();
    }
  }

  // skills
  doc.fontSize(15).text('Skills', {
    align: 'left'
  });
  doc.moveDown();
  for (const skill of skills) {
    doc.fontSize(12).text(`${skill.name}: ${skill.list}`, {
      align: 'left'
    });
    doc.moveDown();
  }




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
  try {
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
    const doc = new PDFDocument({ size: 'A4' });
    doc.pipe(fs.createWriteStream(filepath));
    formPDF(doc, resume);
    doc.end();

    // return url
    res.status(200).json({ url: `pdfs/${filename}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;