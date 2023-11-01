import mongoose from "mongoose";
import { Duration } from "./Duration.mjs";

const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    major: { type: String, required: true },
    minor: { type: String, required: false },
    gpa: { type: String, required: true },
    duration: { type: Duration.schema, required: true }
});

const Education = mongoose.model('Education', educationSchema);
export { Education, educationSchema };