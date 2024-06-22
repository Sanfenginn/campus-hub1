const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    notEmpty: true,
    _id: false,
  },
  description: {
    type: String,
    requires: true,
    _id: false,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    _id: false,
    // requires: true,
  },
  studentClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
      _id: false,
    },
  ],
});

// 在删除 Course 文档之前，更新所有关联的 StudentClass 文档
courseSchema.pre("remove", async function (next) {
  // const StudentClassModel = require("./studentClassModel"); // 引入 StudentClass 模型
  const TeacherModel = require("./teacherModel");
  await TeacherModel.updateMany(
    { courses: this._id },
    { $pull: { courses: this._id } } // 将 studentClass 字段置空
  );
  next();
});

//	1.	students: [...]：表示一个名为 students 的字段，这个字段是一个数组。
//	2.	type: Schema.Types.ObjectId：表示数组中的每个元素的类型是 ObjectId。ObjectId 是 MongoDB 用来唯一标识文档的类型。
//	3.	ref: "Student"：ref 属性用于建立引用关系。它告诉 Mongoose，这个 ObjectId 引用的是 Student 模型中的一个文档。

const Course = model("Course", courseSchema);

module.exports = Course;
