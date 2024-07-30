const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cohortSchema = new Schema({

    cohortSlug: { type: String, unique: true, required: true },
    cohortName: { type: String, required: true },
    program: { type: String, enum: ["Web Dev", "UX/UI", "Data Analytics", "Cybersecurity"] },
    format: { type: String, enum: ["Full Time", "Part Time"] },
    campus: { type: String, enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote"] },
    startDate: { type: Date, default: new Date },
    endDate: { type: Date },
    inProgress: { type: Boolean, default: false },
    programManager: { type: String, required: true },
    leadTeacher: { type: String, required: true },
    totalHours: { type: Number, default: 360 }
});

const Cohort = mongoose.model('Students', cohortSchema)

module.exports = Cohort;