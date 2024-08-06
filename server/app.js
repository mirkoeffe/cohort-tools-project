require('dotenv').config()


const express = require('express');
const app = express();

const isAuthenticated = require("./middleware/jwt.middleware");

require("./db/");

require('./config')(app)

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const cohortsRouter = require("./routes/cohorts.routes");
app.use("/api", cohortsRouter);

const studentsRouter = require("./routes/students.routes");
app.use("/api", studentsRouter);

const authRouter = require('./routes/auth.routes');
app.use('/auth', authRouter);

const userRouter = require("./routes/user.routes");
app.use("/api", isAuthenticated, userRouter);

require("./error-handling")(app);

module.exports = app;