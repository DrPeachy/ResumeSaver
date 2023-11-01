import mongoose from "mongoose";
import { Resume } from "./Resume.mjs";

const workspaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    uploadedResumes: { type: [Resume.schema], required: false },
    outputResume: { type: Resume.schema, required: false }
});

const Workspace = mongoose.model('Workspace', workspaceSchema);
export { Workspace, workspaceSchema };