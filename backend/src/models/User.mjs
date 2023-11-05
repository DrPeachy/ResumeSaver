import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: false }]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);
export { User, userSchema };
