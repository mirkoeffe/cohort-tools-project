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

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

app.use(
  cors({
    origin: ['http://localhost:5173'],
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

app.get("/api/cohorts", (req, res) => {
  Cohorts.find({})
    .then((cohorts) => {
      console.log(`Found ${cohorts.length}`);
      res.json(cohorts);
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

app.get("/api/students/cohort/:cohortId", (req, res) => {
  Students.find({ cohort: req.params.cohortId })
    .populate("cohort")
    .then((students) => {
      console.log(`Found "${students.length}" in cohort ${req.params.cohortId}`);
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

app.patch("/api/students/:studentsId", (req, res) => {
  Students.findByIdAndUpdate(req.params.studentsId, req.body, { new: true })
    .populate("cohort")
    .then((updatedStudent) => {
      if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
      res.json(updatedStudent);
    })
    .catch((error) => res.status(500).json({ error }));
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});