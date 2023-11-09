import mongoose from "mongoose";
// import { SkillSlot } from "./SkillSlot.mjs";
// import { Education } from "./Education.mjs";
// import { Experience } from "./Experience.mjs";

const skillSlotSchema = new mongoose.Schema({
    name: { type: String, required: true },
    list: { type: [String], required: true },
  });

const durationSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    organization: { type: String, required: true },
    location: { type: String, required: false },
    duration: { type: durationSchema, required: true },
    description: { type: [String], required: true }
});

const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    major: { type: String, required: true },
    minor: { type: String, required: false },
    gpa: { type: String, required: true },
    duration: { type: durationSchema, required: true }
});

const headerSchema = new mongoose.Schema({
    name: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: [String], required: false },
    links: { type: [String], required: false }
});

const resumeSchema = new mongoose.Schema({
    header: { type: headerSchema, required: false },
    educations: { type: [educationSchema], required: false },
    experiences: { type: [experienceSchema], required: false },
    skills: { type: [skillSlotSchema], required: false }
});

const Resume = mongoose.model('Resume', resumeSchema);
export { Resume, resumeSchema };
