// Workspace Schema
import mongoose from "mongoose";
import { Resume } from "./Resume.mjs";

const formatSchema = new mongoose.Schema({
    // general
    font: { type: String, required: false },
    margin: { type: Number, required: false },
    lineSpacing: { type: Number, required: false },
    hasDivider: { type: Boolean, required: false },
    headingFontSize: { type: Number, required: false },
    headingAlignment: { type: String, required: false },
    subheadingFontSize: { type: Number, required: false },
    subheadingAlignment: { type: String, required: false },
    bodyFontSize: { type: Number, required: false },
    bodyAlignment: { type: String, required: false },
    // header
    nameFontSize: { type: Number, required: false },
    nameAlignment: { type: String, required: false },
    infoFontSize: { type: Number, required: false },
    infoAlignment: { type: String, required: false },
    infoDivider: { type: String, required: false },
    // education
    institutionFontStyle: { type: String, required: false },
    educationBulletPoint: { type: String, required: false },
    // experience
    titleFontStyle: { type: String, required: false },
    organizationFontStyle: { type: String, required: false },
    experienceBulletPoint: { type: String, required: false },
    // skill
    skillTitleStyle: { type: String, required: false }
});

const workspaceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    dateOfCreation: { type: Date, required: true },
    materials: { type: [String], required: false },
    format: { type: formatSchema, required: false },
    outputResume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', required: false }
});

const Workspace = mongoose.model('Workspace', workspaceSchema);
export { Workspace, workspaceSchema };
