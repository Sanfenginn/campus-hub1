const {
  addStudentClass,
  deleteStudentClass,
  updateStudentClass,
  getAllStudentClasses,
  getStudentClassById,
} = require("../controllers/studentClassesController");
const express = require("express");
const studentClassesRouter = express.Router();

studentClassesRouter.get("/", getAllStudentClasses);
studentClassesRouter.get("/:id", getStudentClassById);
studentClassesRouter.post("/", addStudentClass);
studentClassesRouter.put("/:id", updateStudentClass);
studentClassesRouter.delete("/:id", deleteStudentClass);

module.exports = studentClassesRouter;
