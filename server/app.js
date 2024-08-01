require('dotenv').config()

const express = require('express');
const app = express();

require("./db/");

require('./config')(app)

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const cohortsRouter = require("./routes/cohorts.routes");
app.use("/api", cohortsRouter);

const studentsRouter = require("./routes/students.routes");
app.use("/api", studentsRouter);


module.exports = app;