const express = require("express");
const router = express.Router();

const studentsRouter = require("./studentsRouter");
const coursesRouter = require("./coursesRouter");
const studentClassesRouter = require("./studentClassesRouter");
const teachersRouter = require("./teachersRouter");
const usersRouter = require("./usersRouter");
const getAddressRouter = require("./getAddressRouter");
const receiveFilesRouter = require("./receiveFilesRouter");

router.use("/students", studentsRouter);
router.use("/courses", coursesRouter);
router.use("/student-classes", studentClassesRouter);
router.use("/teachers", teachersRouter);
router.use("/users", usersRouter);
router.use("/get-addresses", getAddressRouter);
router.use("/upload", receiveFilesRouter);

module.exports = router;
