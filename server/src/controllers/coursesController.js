const createNewErrors = require("../utils/createNewErrors");
const CourseModel = require("../models/courseModel");

const addCourse = async (req, res, next) => {
  // const { name, description, teacher, classes } = req.body;
  const courses = req.body;
  try {
    // const newCourse = new CourseSchema({
    //   name,
    //   description,
    //   teacher,
    //   classes,
    // });

    // await newCourse.save();

    const newCourses = await CourseModel.insertMany(courses);
    res.formatResponse(201, newCourses);
  } catch (err) {
    next(err);
  }
};
const deleteCourseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCourse = await CourseModel.findByIdAndDelete(id).exec();

    if (!deletedCourse) {
      const err = createNewErrors("Course not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(204);
  } catch (err) {
    next(err);
  }
};
const updateCourseById = async (req, res, next) => {
  const courseData = req.body;
  const { id } = req.params;

  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      {
        $set: courseData,
      },
      { new: true }
    ).exec();

    if (!updatedCourse) {
      const err = createNewErrors("Course not found", 404, "notFound");
      return next(err);
    }
    res.formatResponse(200, updatedCourse);
  } catch (err) {
    next(err);
  }
};
const getAllCourses = async (req, res, next) => {
  try {
    const allCourses = await CourseModel.find().exec();

    if (allCourses.length === 0) {
      const err = createNewErrors("Courses not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, allCourses);
  } catch (err) {
    next(err);
  }
};
const getCourseById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await CourseModel.findById(id).exec();

    if (!course) {
      const err = createNewErrors("Course not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, course);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addCourse,
  deleteCourseById,
  updateCourseById,
  getAllCourses,
  getCourseById,
};
