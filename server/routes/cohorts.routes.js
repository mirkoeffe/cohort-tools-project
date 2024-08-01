const router = require('express').Router();
const { Types } = require('mongoose')

const Cohorts = require('../models/cohorts.model')
const Students = require('../models/students.model')

router.post("/cohorts", (req, res, next) => {
    Cohorts.create({
        ...req.body,
    })
        .then((cohort) => {
            console.log("Created new cohort:", cohort);
            res.status(201).json(cohort);
        })
        .catch((error) => next(error));
})

router.get("/cohorts", (req, res, next) => {
    Cohorts.find({})
        .then((cohorts) => {
            console.log(`Found ${cohorts.length}`);
            res.json(cohorts);
        })
        .catch((error) => next(error));
})

router.get("/cohorts/:cohortId", (req, res, next) => {
    Cohorts.findById(req.params.cohortId)
        .then((cohort) => {
            if (!cohort) return res.status(404).json({ message: "Cohort not found" });
            res.json(cohort);
        })
        .catch((error) => next(error));
})

router.put("/cohorts/:cohortId", (req, res, next) => {
    Cohorts.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
        .then((updatedCohort) => {
            if (!updatedCohort) return res.status(404).json({ message: "Cohort not found" });
            console.log("Updated cohort:", updatedCohort);

            res.json(updatedCohort);
        })
        .catch((error) => next(error));
})

router.delete("/cohorts/:cohortId", (req, res, next) => {
    Cohorts.findByIdAndDelete(req.params.cohortId)
        .then((deletedCohort) => {
            if (!deletedCohort) return res.status(404).json({ message: "Cohort not found" });
            console.log("Deleted cohort:", deletedCohort);

            res.json(deletedCohort);
        })
        .catch((error) => next(error));
})
module.exports = router;