import mongoose from "mongoose";
// import { SkillSlot } from "./SkillSlot.mjs";
// import { Education } from "./Education.mjs";
// import { Experience } from "./Experience.mjs";

const skillSlotSchema = new mongoose.Schema({
    name: { type: String, required: false },
    list: { type: String, required: false },
  });

const durationSchema = new mongoose.Schema({
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false }
});

const experienceSchema = new mongoose.Schema({
    title: { type: String, required: false },
    type: { type: String, required: false },
    organization: { type: String, required: false },
    location: { type: String, required: false },
    duration: { type: durationSchema, required: false },
    description: { type: String, required: false }
});

const educationSchema = new mongoose.Schema({
    institution: { type: String, required: false },
    location: { type: String, required: false },
    degree: { type: String, required: false },
    major: { type: String, required: false },
    minor: { type: String, required: false },
    gpa: { type: String, required: false },
    duration: { type: durationSchema, required: false }
});

const projectSchema = new mongoose.Schema({
    name: { type: String, required: false },
    skillset: { type: String, required: false },
    duration: { type: durationSchema, required: false },
    description: { type: String, required: false },
});


const achievementSchema = new mongoose.Schema({
    name: { type: String, required: false },
    organization: { type: String, required: false },
    duration: { type: durationSchema, required: false },
    description: { type: String, required: false }
});


const headerSchema = new mongoose.Schema({
    name: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    link: { type: String, required: false }
});

const resumeSchema = new mongoose.Schema({
    header: { type: [headerSchema], required: false },
    educations: { type: [educationSchema], required: false },
    experiences: { type: [experienceSchema], required: false },
    projects: { type: [projectSchema], required: false },
    achievements: { type: [achievementSchema], required: false },
    skills: { type: [skillSlotSchema], required: false }
});

const Resume = mongoose.model('Resume', resumeSchema);
export { Resume, resumeSchema };
