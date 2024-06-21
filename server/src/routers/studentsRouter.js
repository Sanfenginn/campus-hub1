const express = require("express");
const studentsRouter = express.Router();
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentsController");

studentsRouter.post("/", addStudent);
studentsRouter.delete("/:id", deleteStudent);
studentsRouter.put("/:id", updateStudent);
studentsRouter.get("/", getAllStudents);
studentsRouter.get("/:id", getStudentById);

module.exports = studentsRouter;
