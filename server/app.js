require('dotenv').config()

require("./db/db");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Cohorts = require("../server/models/cohorts.model")
const Students = require("../server/models/students.model")
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
/* const cohorts = require("./cohorts.json")
const students = require("./students.json"); */


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err)); */

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
  })
);


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

app.get('/', (req, res) => {
  res.json("hello world")
})

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// STUDENTS ROUTES

app.post("/api/students", (req, res) => {
  Students.create({
    ...req.body,
  })
    .then((student) => {
      console.log("Created new student:", student);
      res.status(201).json(student);
    })
    .catch((error) => res.status(500).json({ error }));
})

app.get("/api/students", (req, res) => {
  Students.find({})
    .populate("cohort")
    .then((students) => {
      console.log(`Found ${students.length}`);
      res.json(students);
    })
    .catch((error) => res.status(500).json({ error }));
})

app.get("/api/students/:studentsId", (req, res) => {
  Students.findById(req.params.studentsId)
    .populate("cohort")
    .then((student) => {
      if (!student) return res.status(404).json({ message: "Student not found" });
      res.json(student);
    })
    .catch((error) => res.status(500).json({ error }));
})

app.get("/api/students/cohort/:cohortId", (req, res) => {
  Students.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((students) => {
      console.log(`Found "${students.length}" in cohort ${req.params.cohortId}`);
      res.json(students);
    })
    .catch((error) => res.status(500).json({ error }));
})

app.put("/api/students/:studentsId", (req, res) => {
  Students.findByIdAndUpdate(req.params.studentsId, req.body, { new: true })
    .populate("cohort")
    .then((updatedStudent) => {
      if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
      console.log("Updated student:", updatedStudent);

      res.json(updatedStudent);
    })
    .catch((error) => res.status(500).json({ error }));
})

app.delete("/api/students/:studentsId", (req, res) => {
  Students.findByIdAndDelete(req.params.studentsId)
    .then((deletedStudent) => {
      if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
      console.log("Deleted student:", deletedStudent);

      res.json(deletedStudent);
    })
    .catch((error) => res.status(500).json({ error }));
})

// COHORT ROUTES

app.post("/api/cohorts", (req, res) => {
  Cohorts.create({
    ...req.body,
  })
    .then((cohort) => {
      console.log("Created new cohort:", cohort);
      res.status(201).json(cohort);
    })
    .catch((error) => res.status(500).json({ error }));
})

app.get("/api/cohorts", (req, res) => {
  Cohorts.find({})
    .then((cohorts) => {
      console.log(`Found ${cohorts.length}`);
      res.json(cohorts);
    })
    .catch((error) => res.status(500).json({ error }));
})

app.get("/api/cohorts/:cohortId", (req, res) => {
  Cohorts.findById(req.params.cohortId)
    .then((cohort) => {
      if (!cohort) return res.status(404).json({ message: "Cohort not found" });
      res.json(cohort);
    })
    .catch((error) => res.status(500).json({ error }));
})

app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohorts.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      if (!updatedCohort) return res.status(404).json({ message: "Cohort not found" });
      console.log("Updated cohort:", updatedCohort);

      res.json(updatedCohort);
    })
    .catch((error) => res.status(500).json({ error }));
})

app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohorts.findByIdAndDelete(req.params.cohortId)
    .then((deletedCohort) => {
      if (!deletedCohort) return res.status(404).json({ message: "Cohort not found" });
      console.log("Deleted cohort:", deletedCohort);

      res.json(deletedCohort);
    })
    .catch((error) => res.status(500).json({ error }));
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

