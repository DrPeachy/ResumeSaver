import express from 'express';
const router = express.Router();

import * as auth from '../utils/auth.mjs';

import mongoose from 'mongoose';
import exp from 'constants';
const User = mongoose.model('User');
const Workspace = mongoose.model('Workspace');

router.get('/workspace/get-recent', auth.checkAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ username: res.locals.currentUser });
    const recentWorspaceId = user.recentWorspaceId;
    const recentWorkspace = await Workspace.findById(recentWorspaceId);
    res.status(200).json({ recentWorkspace: recentWorkspace });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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

export default router;