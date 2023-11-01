import mongoose from 'mongoose';

const durationSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
});

const Duration = mongoose.model('Duration', durationSchema);
export { Duration, durationSchema };