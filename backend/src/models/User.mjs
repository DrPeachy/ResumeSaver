import mongoose from "mongoose";
import { Workspace } from "./Workspace.mjs";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    workspaces: { type: [Workspace.schema], required: false }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
export { User, userSchema };