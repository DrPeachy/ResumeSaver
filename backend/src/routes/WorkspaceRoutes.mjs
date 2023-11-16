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

function drawLine(doc) {
  doc.moveDown(0.0);
  doc.moveTo(60, doc.y)
    .lineTo(540, doc.y)
    .stroke();
  doc.moveDown(0.4);
}

const formPDF = (doc, resume) => {
  const header = resume.header[0] ?? { name: '', phone: '', email: '', link: '' };
  const { educations, experiences, skills } = resume;
  doc.font('Times-Roman');

  // header
  doc.fontSize(20).text(header.name, { align: 'center' });
  doc.fontSize(12).text(`${header.phone}${header.email ? ` • ${header.email}` : ''}${header.link ? ` • ${header.link}` : ''}`, {
    align: 'center'
  });
  doc.moveDown();

  // education
  if (educations.length > 0) {
    doc
      .font('Times-Bold')
      .fontSize(15)
      .text('Education',
        { align: 'left' }
      );
  }
  drawLine(doc);
  //doc.moveDown();
  for (const education of educations) {
    doc
      .font('Times-Bold')
      .fontSize(12)
      .text(education.institution ? education.institution : '',
        { align: 'left', continued: true })
      .font('Times-Roman')
      .fontSize(12)
      .text(education.location ? `, ${education.location}` : '',
        { align: 'left' });
    doc.moveUp();

    doc
      .font('Times-Roman')
      .fontSize(12)
      .text(
        `${dateToString(education.duration.startDate)}${education.duration.endDate ? `-${dateToString(education.duration.endDate)}` : ''} `,
      );
    //doc.moveDown();

    doc
      .font('Times-Roman')
      .fontSize(12)
      .text(`${education.degree} in ${education.major}${education.minor ? `, minor in ${education.minor}` : ''} `,
        { align: 'left' }
      );
    //doc.moveDown();
    doc
      .font('Times-Roman')
      .fontSize(12)
      .text(`GPA: ${education.gpa} `, { align: 'left' });
    doc.moveDown();

  }

  // experience
  doc
    .font('Times-Bold')
    .fontSize(15)
    .text('Experience',
      { align: 'left' }
    );
  drawLine(doc);
  //doc.moveDown();
  for (const experience of experiences) {
    doc
      .font('Times-Bold')
      .fontSize(12)
      .text(`${experience.title}`,
        { align: 'left', continued: true })
      .font('Times-Roman')
      .fontSize(12)
      .text(`${experience.organization ? `, ${experience.organization}` : ''}`,
        { align: 'left', continued: true })
      .font('Times-Roman')
      .fontSize(12)
      .text(`${experience.location ? `, ${experience.location}` : ''}`,
        { align: 'left' });



    doc.moveUp();
    doc
      .font('Times-Roman')
      .fontSize(12)
      .text(
        `${dateToString(experience.duration.startDate)}${experience.duration.endDate ? `-${dateToString(experience.duration.endDate)}` : ''} `,
        { align: 'right' }
      );
    //doc.moveDown();
    // split description by newline
    const description = experience.description.split('\n');
    for (const line of description) {
      doc.fontSize(12).text(`• ${line} `, {
        align: 'left'
      });
      //doc.moveDown();
    }
    doc.moveDown();
  }

  // skills
  doc
    .font('Times-Bold')
    .fontSize(15)
    .text('Skills', {
      align: 'left'
    });
  drawLine(doc);
  //doc.moveDown();
  for (const skill of skills) {
    doc
      .font('Times-Bold')
      .fontSize(12)
      .text(`${skill.name}: `,
        { align: 'left', continued: true }
      )
      .font('Times-Roman')
      .fontSize(12)
      .text(`${skill.list}`,
        { align: 'right' }
      );
    doc.moveDown();
  }
}



router.get('/workspace', auth.checkAuthenticated, async (req, res) => {
  const id = req.query.id;
  console.log(`id: ${id} `);
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