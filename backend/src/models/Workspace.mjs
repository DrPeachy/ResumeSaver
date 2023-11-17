// Workspace Schema
import mongoose from "mongoose";
import { Resume } from "./Resume.mjs";

const formatSchema = new mongoose.Schema({
    font: { type: String, required: false },
    margin: { type: Number, required: false },
    lineSpacing: { type: Number, required: false },
    hasDivider: { type: Boolean, required: false },
    nameFontSize: { type: Number, required: false },
    nameAlignment: { type: String, required: false },
    infoFontSize: { type: Number, required: false },
    infoAlignment: { type: String, required: false },

    sectionHeaderFontSize: { type: Number, required: false },
    sectionHeaderAlignment: { type: String, required: false },
    sectionContentFontSize: { type: Number, required: false },
    sectionContentAlignment: { type: String, required: false },

    institutionFontStyle: { type: String, required: false },
    educationBulletPoint: { type: String, required: false },

    titleFontStyle: { type: String, required: false },
    organizationFontStyle: { type: String, required: false },
    bulletPoint: { type: String, required: false },

    skillTitleStyle: { type: String, required: false },
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
