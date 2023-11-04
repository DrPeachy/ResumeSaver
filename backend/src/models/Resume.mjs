import mongoose from "mongoose";
import { SkillSlot } from "./SkillSlot.mjs";
import { Education } from "./Education.mjs";
import { Experience } from "./Experience.mjs";

const resumeSchema = new mongoose.Schema({
    name: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: [String], required: false },
    links: { type: [String], required: false },
    educations: { type: [Education.schema], required: false },
    experiences: { type: [Experience.schema], required: false },
    skills: { type: SkillSlot.schema, required: false }

});

const Resume = mongoose.model('Resume', resumeSchema);
export { Resume, resumeSchema };
