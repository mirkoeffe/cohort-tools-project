const router = require('express').Router();

const Cohorts = require('../models/cohorts.model');
const Students = require('../models/students.model');

router.post("/students", async (req, res, next) => {
    try {
        const student = await Students.create({
            ...req.body,
        });
        console.log("Created new student:", student);
        res.status(201).json(student);
    }
    catch (error) {
        next(error);
    }
});

router.get("/students", async (req, res, next) => {
    try {
        const student = await Students.find({}).populate("cohort");
        res.status(200).json(student)
    } catch (error) {
        next(error);
    }
});

router.get("/students/:studentId", async (req, res, next) => {
    try {
        const student = await Students.findById(req.params.studentId).populate("cohort");
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);

    } catch (error) {
        next(error)
    }
})



router.get("/students/cohort/:cohortId", async (req, res, next) => {
    try {
        const students = await Students.find({ cohort: req.params.cohortId })
            .populate("cohort");
        console.log(`Found "${students.length}" in cohort ${req.params.cohortId}`);
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
});



router.put("/students/:studentsId", async (req, res, next) => {
    try {
        const updatedStudent = await Students.findByIdAndUpdate(req.params.studentsId, req.body, { new: true })
            .populate("cohort");

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        console.log("Updated student:", updatedStudent);
        res.status(200).json(updatedStudent);
    } catch (error) {
        next(error);
    }
})



router.delete("/students/:studentsId", async (req, res, next) => {
    try {
        const deletedStudent = await Students.findByIdAndDelete(req.params.studentsId)

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        console.log("Deleted student:", deletedStudent);
        res.status(200).json(deletedStudent);
    } catch (error) {
        next(error);
    }
})

module.exports = router;