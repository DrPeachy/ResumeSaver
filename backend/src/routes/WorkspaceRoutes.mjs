import express from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

import * as auth from '../utils/auth.mjs';

import mongoose from 'mongoose';
import { formatSchema } from '../models/Workspace.mjs';
import { get } from 'http';
const User = mongoose.model('User');
const Workspace = mongoose.model('Workspace');
const Resume = mongoose.model('Resume');

const fonts = [
  'Times-Roman',
  'OpenSans',
  'LibreBaskerville',
  'Roboto',
  'Lora',
  'Tinos',
  'EBGaramond',
  'Carlito',
  'Arimo'
];

const fontWeights = [
  'Regular',
  'Bold',
  'Italic',
];

const dateToString = (date) => {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
}

function drawLine(doc, margin = 1) {
  const marginToPos = margin * 72;

  doc.moveDown(0.0);
  doc.moveTo(marginToPos, doc.y)
    .lineTo(595.28 - marginToPos, doc.y)
    .stroke();
  doc.moveDown(0.4);
}

function getFontPath(cfg, key) {
  return cfg[key.toLowerCase()];
}

const formPDF = (doc, resume, fontCfg, format) => {
  const header = resume.header[0] ?? { name: '', phone: '', email: '', link: '' };
  const { educations, experiences, skills } = resume;
  const getLineGap = (fontSize) => {
    return (fontSize * format.lineSpacing) - fontSize;
  };

  doc.font(fontCfg.regular);

  /// header
  // name
  doc
    .fontSize(format.nameFontSize)
    .lineGap(getLineGap(format.nameFontSize))
    .text(header.name,
      { align: format.nameAlignment }
    );
  // info
  doc
    .fontSize(format.infoFontSize)
    .lineGap(getLineGap(format.infoFontSize))
    .text(
      `${header.phone}${header.email ? `${format.infoDivider}${header.email}` : ''}${header.link ? `${format.infoDivider}${header.link}` : ''}`,
      { align: format.infoAlignment }
    )

  doc.moveDown();

  // education
  if (educations.length > 0) {
    doc
      .font(fontCfg.bold)
      .fontSize(format.headingFontSize)
      .lineGap(0)
      .text('Education',
        { align: format.headingAlignment }
      );
    if (format.hasDivider) drawLine(doc, format.margin);
  }
  for (const education of educations) {
    doc
      .font(getFontPath(fontCfg, format.institutionFontStyle))
      .fontSize(format.subheadingFontSize)
      .lineGap(getLineGap(format.subheadingFontSize))
      .text(
        education.institution ? education.institution : '',
        { align: format.subheadingAlignment, continued: true })
      .font(fontCfg.regular)
      .fontSize(format.subheadingFontSize)
      .text(
        education.location ? `, ${education.location}` : '',
        { align: format.subheadingAlignment });
    doc.moveUp();

    doc
      .font(fontCfg.regular)
      .fontSize(format.bodyFontSize)
      .lineGap(getLineGap(format.bodyFontSize))
      .text(
        `${dateToString(education.duration.startDate)}${education.duration.endDate ? `-${dateToString(education.duration.endDate)}` : ''} `,
        { align: 'right' }
      );
    //doc.moveDown();

    doc
      .font(fontCfg.regular)
      .fontSize(format.bodyFontSize)
      .lineGap(getLineGap(format.bodyFontSize))
      .text(
        `${format.educationBulletPoint}${education.degree} in ${education.major}${education.minor ? `, minor in ${education.minor}` : ''} `,
        { align: format.bodyAlignment }
      );
    //doc.moveDown();
    doc
      .font(fontCfg.regular)
      .fontSize(format.bodyFontSize)
      .lineGap(getLineGap(format.bodyFontSize))
      .text(
        `${format.educationBulletPoint}GPA: ${education.gpa} `,
        { align: format.bodyAlignment }
      );
    doc.moveDown();

  }

  // experience
  if (experiences.length > 0) {
    doc
      .font(fontCfg.bold)
      .fontSize(format.headingFontSize)
      .lineGap(0)
      .text('Experience',
        { align: format.headingAlignment }
      );
    if (format.hasDivider) drawLine(doc, format.margin);
  }
  for (const experience of experiences) {
    doc
      .font(getFontPath(fontCfg, format.titleFontStyle))
      .fontSize(format.subheadingFontSize)
      .lineGap(getLineGap(format.subheadingFontSize))
      .text(`${experience.title}`,
        { align: format.subheadingAlignment, continued: true })
      .font(getFontPath(fontCfg, format.organizationFontStyle))
      .fontSize(format.subheadingFontSize)
      .lineGap(getLineGap(format.subheadingFontSize))
      .text(`${experience.organization ? `, ${experience.organization}` : ''}`,
        { align: format.subheadingAlignment, continued: true })
      .font(fontCfg.regular)
      .fontSize(format.subheadingFontSize)
      .lineGap(getLineGap(format.subheadingFontSize))
      .text(`${experience.location ? `, ${experience.location}` : ''}`,
        { align: format.subheadingAlignment });

    // date
    doc.moveUp();
    doc
      .font(fontCfg.regular)
      .fontSize(format.bodyFontSize)
      .lineGap(getLineGap(format.bodyFontSize))
      .text(
        `${dateToString(experience.duration.startDate)}${experience.duration.endDate ? `-${dateToString(experience.duration.endDate)}` : ''} `,
        { align: 'right' }
      );
    // split description by newline
    const description = experience.description.split('\n');
    for (const line of description) {
      doc
        .fontSize(format.bodyFontSize)
        .lineGap(getLineGap(format.bodyFontSize))
        .text(`${format.experienceBulletPoint}${line} `, {
          align: 'left'
        });
    }
    doc.moveDown();
  }

  // skills
  if (skills.length > 0) {
    doc
      .font(fontCfg.bold)
      .fontSize(format.headingFontSize)
      .lineGap(0)
      .text('Skills',
        { align: format.headingAlignment }
      );
    if (format.hasDivider) drawLine(doc, format.margin);
  }
  for (const skill of skills) {
    doc
      .font(getFontPath(fontCfg, format.skillTitleStyle))
      .fontSize(format.subheadingFontSize)
      .lineGap(getLineGap(format.subheadingFontSize))
      .text(`${skill.name}: `,
        { align: 'left', continued: true }
      )
      .font(fontCfg.regular)
      .fontSize(format.bodyFontSize)
      .lineGap(getLineGap(format.bodyFontSize))
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

router.post('/workspace/format', auth.checkAuthenticated, async (req, res) => {
  try {
    const id = req.body.id;
    const format = req.body.format;
    const workspace = await Workspace.findById(id);
    workspace.format = format;
    await workspace.save();
    res.status(200).json({ message: 'Format updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    // get format
    const format = workspace.format;
    //get user id
    const userId = res.locals.currentUser;
    // config filename
    const filename = `${userId}_${workspaceId}_${resumeId}.pdf`;
    const filepath = path.join(__dirname, '..', 'public', 'pdfs', filename);
    const fontCfg = {};
    // config font
    if (format.font == 'Times-Roman') {
      fontCfg.regular = 'Times-Roman';
      fontCfg.bold = 'Times-Bold';
      fontCfg.italic = 'Times-Italic';
    } else {
      const fontPath = path.join(__dirname, '..', 'public', 'fonts');
      fontCfg.regular = path.join(fontPath, `${format.font}-Regular.ttf`);
      fontCfg.bold = path.join(fontPath, `${format.font}-Bold.ttf`);
      fontCfg.italic = path.join(fontPath, `${format.font}-Italic.ttf`);
    }


    // form pdf
    const doc = new PDFDocument({ size: 'A4', margin: format.margin * 72, lineGap: format.lineSpacing * 72 });
    doc.pipe(fs.createWriteStream(filepath));
    formPDF(doc, resume, fontCfg, format);
    doc.end();

    // return url
    res.status(200).json({ url: `pdfs/${filename}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;