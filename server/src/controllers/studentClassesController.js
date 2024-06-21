const StudentClassModel = require("../models/studentClassModel");
const createNewErrors = require("../utils/createNewErrors");

const addStudentClass = async (req, res, next) => {
  const studentClasses = req.body;
  try {
    const newStudentClasses = await StudentClassModel.insertMany(
      studentClasses
    );
    res.formatResponse(201, newStudentClasses);
  } catch (err) {
    next(err);
  }
};

const deleteStudentClass = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedStudentClass = await StudentClassModel.findByIdAndDelete(
      id
    ).exec();

    if (!deletedStudentClass) {
      const err = createNewErrors("Student Class not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(204);
  } catch (err) {
    next(err);
  }
};

const updateStudentClass = async (req, res, next) => {
  const studentClassData = req.body;
  const { id } = req.params;

  try {
    const updatedStudentClass = await StudentClassModel.findByIdAndUpdate(
      id,
      {
        $set: studentClassData,
      },
      { new: true }
    ).exec();

    if (!updatedStudentClass) {
      const err = createNewErrors("Student Class not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, updatedStudentClass);
  } catch (err) {
    next(err);
  }
};
const getAllStudentClasses = async (req, res, next) => {
  try {
    const allStudentClasses = await StudentClassModel.find().exec();

    if (allStudentClasses.length === 0) {
      const err = createNewErrors("Student Classes not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, allStudentClasses);
  } catch (err) {
    next(err);
  }
};
const getStudentClassById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const studentClass = await StudentClassModel.findById(id);

    if (!studentClass) {
      const err = createNewErrors("Student Class not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, studentClass);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addStudentClass,
  deleteStudentClass,
  updateStudentClass,
  getAllStudentClasses,
  getStudentClassById,
};
