const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cohortSchema = new Schema({

    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    linkedinUrl: String,
    languages: [String],
    program: String,
    background: String,
    image: String,
    projects: [String],
    cohort: {
        $oid: String
    }
});

const Cohort = mongoose.model('Cohort', cohortSchema)

module.exports = Cohort;