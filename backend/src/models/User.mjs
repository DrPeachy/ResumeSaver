import mongoose from "mongoose";
import { Workspace } from "./Workspace.mjs";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    hash: { type: String, required: true },
    workspaces: { type: [Workspace.schema], required: false }
});

const User = mongoose.model('User', userSchema);
export { User, userSchema };