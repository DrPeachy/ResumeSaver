import mongoose from "mongoose";
import { Duration } from "./Duration.mjs";

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    organization: { type: String, required: true },
    location: { type: String, required: false },
    duration: { type: Duration.schema, required: true },
    description: { type: [String], required: true }
});

const Experience = mongoose.model('Experience', experienceSchema);
export { Experience, experienceSchema };