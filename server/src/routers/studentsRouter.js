const express = require("express");
const studentsRouter = express.Router();
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentsController");
const {
  validateStudent,
  checkId,
} = require("../middlewares/validationMiddleware");

studentsRouter.post("/", validateStudent, addStudent);
studentsRouter.delete("/:id", checkId, deleteStudent);
studentsRouter.put("/:id", checkId, validateStudent, updateStudent);
studentsRouter.get("/", getAllStudents);
studentsRouter.get("/:id", checkId, getStudentById);

module.exports = studentsRouter;
