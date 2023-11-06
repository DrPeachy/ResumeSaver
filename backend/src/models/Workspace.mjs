// Workspace Schema
import mongoose from "mongoose";
import { Resume } from "./Resume.mjs";

const workspaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    dateOfCreation: { type: Date, required: true },
    uploadedResumes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: false }],
    outputResume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: false }
});

const Workspace = mongoose.model('Workspace', workspaceSchema);
export { Workspace, workspaceSchema };
