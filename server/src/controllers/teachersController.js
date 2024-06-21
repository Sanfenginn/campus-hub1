const TeacherModel = require("../models/teacherModel");
const createNewErrors = require("../utils/createNewErrors");

const addTeachers = async (req, res, next) => {
  const teachers = req.body;

  try {
    const newTeachers = await TeacherModel.insertMany(teachers);
    res.formatResponse(201, newTeachers);
  } catch (err) {
    next(err);
  }
};
const deleteTeacherById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTeacher = await TeacherModel.findByIdAndDelete(id).exec();

    if (!deletedTeacher) {
      const err = createNewErrors("Teacher not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(204);
  } catch (err) {
    next(err);
  }
};

const updateTeacherById = async (req, res, next) => {
  const { id } = req.params;
  const teacherData = req.body;

  try {
    const updatedTeacher = await TeacherModel.findByIdAndUpdate(
      id,
      { $set: teacherData },
      { new: true }
    ).exec();

    if (!updatedTeacher) {
      const err = createNewErrors("Teacher not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, updatedTeacher);
  } catch (err) {
    next(err);
  }
};
const getAllTeachers = async (req, res, next) => {
  try {
    const allTeachers = await TeacherModel.find().exec();

    if (allTeachers.length === 0) {
      const err = createNewErrors("Teachers not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, allTeachers);
  } catch (err) {
    next(err);
  }
};
const getTeacherById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const teacher = await TeacherModel.findById(id).exec();

    if (!teacher) {
      const err = createNewErrors("Teacher not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, teacher);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addTeachers,
  deleteTeacherById,
  updateTeacherById,
  getAllTeachers,
  getTeacherById,
};
