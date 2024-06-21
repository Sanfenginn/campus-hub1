const express = require("express");
const teachersRouter = express.Router();
const {
  addTeachers,
  deleteTeacherById,
  updateTeacherById,
  getAllTeachers,
  getTeacherById,
} = require("../controllers/teachersController");

teachersRouter.get("/", getAllTeachers);
teachersRouter.get("/:id", getTeacherById);
teachersRouter.post("/", addTeachers);
teachersRouter.put("/:id", updateTeacherById);
teachersRouter.delete("/:id", deleteTeacherById);

module.exports = teachersRouter;
