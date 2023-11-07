import express from "express";
import * as auth from "../utils/auth.mjs";
import mongoose from "mongoose";
const User = mongoose.model("User");
const Workspace = mongoose.model("Workspace");
const router = express.Router();


router.get("/dashboard", auth.checkAuthenticated, async (req, res) => {
  const user = await User.findOne({ username: res.locals.currentUser });
  const workspaces = user.workspaces;
  const workspaceObjects = [];
  for await (const workspace of workspaces) {
    const workspaceObject = await Workspace.findById(workspace);
    workspaceObjects.push(workspaceObject);
  }
  res.status(200).json({ workspaces: workspaceObjects });
});

router.post("/dashboard/del", auth.checkAuthenticated, async (req, res) => {
  const id = req.body.id;
  const user = await User.findOne({ username: res.locals.currentUser });
  user.workspaces.pull(id);
  await user.save();
  await Workspace.findByIdAndDelete(id);
  res.status(200).json({ message: "Workspace deleted" });
});

router.post("/dashboard/create", auth.checkAuthenticated, async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const user = await User.findOne({ username: res.locals.currentUser });
  const workspace = new Workspace({
    name: name,
    description: description,
    dateOfCreation: Date.now(),
  });
  await workspace.save();
  user.workspaces.push(workspace._id);
  await user.save();
  res.status(200).json({ workspace: workspace });
});

router.post("/dashboard/edit", auth.checkAuthenticated, async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const workspace = await Workspace.findById(id);
  workspace.name = name;
  workspace.description = description;
  workspace.dateOfCreation = Date.now();
  await workspace.save();
  res.status(200).json({ workspace: workspace });
});


router.get("/checkToken", auth.checkAuthenticated, (req, res) => {
  res.sendStatus(200);
});

export default router;