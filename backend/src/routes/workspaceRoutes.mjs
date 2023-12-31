import express from 'express';
import PDFDocument from 'pdfkit';
import multer from 'multer';
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
//import PDFParser from "pdf2json";
//import textract from 'textract';

import fs from 'fs';
import path, { sep } from 'path';
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

const upload = multer({ storage: multer.memoryStorage() });

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

const possibleBulletPoints = [
  '∙',
  '•',
  '◦',
  '▪',
  '▫',
  '▸',
  '▹',
  '-',
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

  // projects
  if (resume.projects.length > 0) {
    doc
      .font(fontCfg.bold)
      .fontSize(format.headingFontSize)
      .lineGap(0)
      .text('Projects',
        { align: format.headingAlignment }
      );
    if (format.hasDivider) drawLine(doc, format.margin);
  }
  for (const project of resume.projects) {
    doc
      .font(getFontPath(fontCfg, format.titleFontStyle))
      .fontSize(format.subheadingFontSize)
      .lineGap(getLineGap(format.subheadingFontSize))
      .text(`${project.name}`,
        { align: format.subheadingAlignment, continued: true })
      .font(fontCfg.regular)
      .fontSize(format.subheadingFontSize)
      .lineGap(getLineGap(format.subheadingFontSize))
      .text(`${project.skillset ? `(${project.skillset})` : ''}`,
        { align: format.subheadingAlignment });

    // date
    doc.moveUp();
    doc
      .font(fontCfg.regular)
      .fontSize(format.bodyFontSize)
      .lineGap(getLineGap(format.bodyFontSize))
      .text(
        `${dateToString(project.duration.startDate)}${project.duration.endDate ? `-${dateToString(project.duration.endDate)}` : ''} `,
        { align: 'right' }
      );
    // split description by newline
    const description = project.description.split('\n');
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

  // achievements
  if (resume.achievements.length > 0) {
    doc
      .font(fontCfg.bold)
      .fontSize(format.headingFontSize)
      .lineGap(0)
      .text('Achievements',
        { align: format.headingAlignment }
      );
    if (format.hasDivider) drawLine(doc, format.margin);
  }
  for (const achievement of resume.achievements) {
    doc
      .font(getFontPath(fontCfg, format.titleFontStyle))
      .fontSize(format.subheadingFontSize)
      .lineGap(getLineGap(format.subheadingFontSize))
      .text(`${achievement.name}`,
        { align: format.subheadingAlignment, continued: true })
      .font(getFontPath(fontCfg, format.organizationFontStyle))
      .fontSize(format.subheadingFontSize)
      .lineGap(getLineGap(format.subheadingFontSize))
      .text(`${achievement.organization ? `, ${achievement.organization}` : ''}`,
        { align: format.subheadingAlignment });

    // date
    doc.moveUp();
    doc
      .font(fontCfg.regular)
      .fontSize(format.bodyFontSize)
      .lineGap(getLineGap(format.bodyFontSize))
      .text(
        `${dateToString(achievement.duration.startDate)}${achievement.duration.endDate ? `-${dateToString(achievement.duration.endDate)}` : ''} `,
        { align: 'right' }
      );
    // split description by newline
    const description = achievement.description.split('\n');
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

const processText = (text) => {
  let sepLine = text.split('\n');
  let lineLength = sepLine.length;
  const isTitle = (line) => {
    return line.length > 0 && line.length < 20;
  };
  const isBulletPoint = (line) => {
    line = line.trimStart();
    return line.length > 0 && possibleBulletPoints.includes(line[0]);
  };
  for (let i = 0; i < lineLength; i++) {
    // if this line has bullet point and the next is not and is not a title, merge them
    if ((i + 1) < lineLength && isBulletPoint(sepLine[i]) && !isBulletPoint(sepLine[i + 1]) && !isTitle(sepLine[i + 1])) {
      sepLine[i] = sepLine[i] + sepLine[i + 1];
      sepLine.splice(i + 1, 1);
      lineLength--;
    }
  }
  for (let i = 0; i < lineLength; i++) {
    // if the line is all spaces, or if it's a title, remove it
    if (sepLine[i].trim() === '' || isTitle(sepLine[i])) {
      sepLine.splice(i, 1);
      lineLength--;
      i--;
    }
  }
  for (let i = 0; i < lineLength; i++) {
    if ((i + 1) < lineLength && isBulletPoint(sepLine[i]) && isBulletPoint(sepLine[i + 1]) ) {
      sepLine[i] = sepLine[i] + '\n' + sepLine[i + 1];
      sepLine.splice(i + 1, 1);
      lineLength--;
      i--;
    }
  }
  return sepLine;
};

router.post('/workspace/upload', auth.checkAuthenticated, upload.single('file'), async (req, res) => {
  try {
    const id = req.body.id;
    const file = req.file;
    console.log(file);
    const workspace = await Workspace.findById(id);
    const materials = workspace.materials;
    let extractedText = '';

    if (file.mimetype === 'application/pdf') {
      extractedText = await pdfParse(file.buffer);
    } else {
      extractedText = file.buffer.toString();
    }

    let sepLine = processText(extractedText.text);
    // store the text into materials
    materials.push(...sepLine);
    workspace.materials = materials;
    await workspace.save();

    res.status(200).json({ message: 'File processed successfully', text: sepLine });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/workspace/material', auth.checkAuthenticated, async (req, res) => {
  try {
    const id = req.query.id;
    const workspace = await Workspace.findById(id);
    const materials = workspace.materials;
    res.status(200).json({ materials: materials });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/workspace/material', auth.checkAuthenticated, async (req, res) => {
  try {
    const id = req.body.id;
    const materials = req.body.materials;
    const workspace = await Workspace.findById(id);
    workspace.materials = materials;
    await workspace.save();
    res.status(200).json({ message: 'Material added' });
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