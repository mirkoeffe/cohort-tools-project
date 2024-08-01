const router = require('express').Router();

const Cohorts = require('../models/cohorts.model');
const Students = require('../models/students.model');

router.post("/students", (req, res) => {
    Students.create({
        ...req.body,
    })
        .then((student) => {
            console.log("Created new student:", student);
            res.status(201).json(student);
        })
        .catch((error) => res.status(500).json({ error }));
})



router.get("/students", (req, res) => {
    Students.find({})
        .populate("cohort")
        .then((students) => {
            console.log(`Found ${students.length}`);
            res.json(students);
        })
        .catch((error) => res.status(500).json({ error }));
})



router.get("/students/:studentsId", (req, res) => {
    Students.findById(req.params.studentsId)
        .populate("cohort")
        .then((student) => {
            if (!student) return res.status(404).json({ message: "Student not found" });
            res.json(student);
        })
        .catch((error) => res.status(500).json({ error }));
})



router.get("/students/cohort/:cohortId", (req, res) => {
    Students.find({ cohort: req.params.cohortId })
        .populate("cohort")
        .then((students) => {
            console.log(`Found "${students.length}" in cohort ${req.params.cohortId}`);
            res.json(students);
        })
        .catch((error) => res.status(500).json({ error }));
})



router.put("/students/:studentsId", (req, res) => {
    Students.findByIdAndUpdate(req.params.studentsId, req.body, { new: true })
        .populate("cohort")
        .then((updatedStudent) => {
            if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
            console.log("Updated student:", updatedStudent);

            res.json(updatedStudent);
        })
        .catch((error) => res.status(500).json({ error }));
})



router.delete("/students/:studentsId", (req, res) => {
    Students.findByIdAndDelete(req.params.studentsId)
        .then((deletedStudent) => {
            if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
            console.log("Deleted student:", deletedStudent);

            res.json(deletedStudent);
        })
        .catch((error) => res.status(500).json({ error }));
})

module.exports = router;