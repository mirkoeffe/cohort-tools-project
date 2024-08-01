const router = require('express').Router();
const { Types } = require('mongoose')

const Cohorts = require('../models/cohorts.model')
const Students = require('../models/students.model')

router.post("/cohorts", (req, res) => {
    Cohorts.create({
        ...req.body,
    })
        .then((cohort) => {
            console.log("Created new cohort:", cohort);
            res.status(201).json(cohort);
        })
        .catch((error) => res.status(500).json({ error }));
})

router.get("/cohorts", (req, res) => {
    Cohorts.find({})
        .then((cohorts) => {
            console.log(`Found ${cohorts.length}`);
            res.json(cohorts);
        })
        .catch((error) => res.status(500).json({ error }));
})

router.get("/cohorts/:cohortId", (req, res) => {
    Cohorts.findById(req.params.cohortId)
        .then((cohort) => {
            if (!cohort) return res.status(404).json({ message: "Cohort not found" });
            res.json(cohort);
        })
        .catch((error) => res.status(500).json({ error }));
})

router.put("/cohorts/:cohortId", (req, res) => {
    Cohorts.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
        .then((updatedCohort) => {
            if (!updatedCohort) return res.status(404).json({ message: "Cohort not found" });
            console.log("Updated cohort:", updatedCohort);

            res.json(updatedCohort);
        })
        .catch((error) => res.status(500).json({ error }));
})

router.delete("/cohorts/:cohortId", (req, res) => {
    Cohorts.findByIdAndDelete(req.params.cohortId)
        .then((deletedCohort) => {
            if (!deletedCohort) return res.status(404).json({ message: "Cohort not found" });
            console.log("Deleted cohort:", deletedCohort);

            res.json(deletedCohort);
        })
        .catch((error) => res.status(500).json({ error }));
})
module.exports = router;