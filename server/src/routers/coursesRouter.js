const express = require("express");
const coursesRouter = express.Router();
const {
  addCourse,
  deleteCourseById,
  updateCourseById,
  getAllCourses,
  getCourseById,
} = require("../controllers/coursesController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

coursesRouter.get("/", getAllCourses);
coursesRouter.get("/:id", getCourseById);
coursesRouter.post(
  "/",
  authenticate,
  authorize("manage_courses_add"),
  addCourse
);
coursesRouter.put("/:id", updateCourseById);
coursesRouter.delete("/:id", deleteCourseById);

module.exports = coursesRouter;
