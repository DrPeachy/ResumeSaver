import mongoose from "mongoose";

const skillSlotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  list: { type: [String], required: true },
});

const SkillSlot = mongoose.model("SkillSlot", skillSlotSchema);
export { SkillSlot, skillSlotSchema };