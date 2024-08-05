const router = require('express').Router();

const Cohorts = require('../models/cohorts.model')

router.post("/cohorts", async (req, res, next) => {
    try {
        const cohort = await Cohorts.create({
            ...req.body,
        });
        console.log("Created new cohort:", cohort);
        res.status(201).json(cohort);
    } catch (error) {
        next(error);
    }
})

router.get("/cohorts", async (req, res, next) => {
    try {
        const cohorts = await Cohorts.find({});
        console.log(`Found ${cohorts.length}`);
        res.status(200).json(cohorts);
    } catch (error) {
        next(error);
    }
})

router.get("/cohorts/:cohortId", async (req, res, next) => {
    try {
        const cohort = await Cohorts.findById(req.params.cohortId);
        if (!cohort) return res.status(404).json({ message: "Cohort not found" });
        res.status(200).json(cohort);
    } catch (error) {
        next(error);
    }
})

router.put("/cohorts/:cohortId", (req, res, next) => {
    Cohorts.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
        .then(async (updatedCohort) => {
            if (!updatedCohort) {
                return res.status(404).json({ message: "Cohort not found" });
            }
            console.log("Updated cohort:", updatedCohort);

            res.status(200).json(updatedCohort);
        })
        .catch((error) => next(error));
})

router.delete("/cohorts/:cohortId", async (req, res, next) => {
    try {
        const deletedCohort = await Cohorts.findByIdAndDelete(req.params.cohortId);
        if (!deletedCohort) return res.status(404).json({ message: "Cohort not found" });
        console.log("Deleted cohort:", deletedCohort);

        res.status(200).json(deletedCohort);
    } catch (error) {
        next(error);
    }
})

module.exports = router;