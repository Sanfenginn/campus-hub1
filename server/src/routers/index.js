const express = require("express");
const router = express.Router();

const studentsRouter = require("./studentsRouter");
const coursesRouter = require("./coursesRouter");
const studentClassesRouter = require("./studentClassesRouter");
const teachersRouter = require("./teachersRouter");
const usersRouter = require("./usersRouter");

router.use("/students", studentsRouter);
router.use("/courses", coursesRouter);
router.use("/student-classes", studentClassesRouter);
router.use("/teachers", teachersRouter);
router.use("/users", usersRouter);

module.exports = router;
