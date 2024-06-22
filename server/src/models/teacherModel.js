const { Schema, model } = require("mongoose");

const teacherSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    _id: false,
  },
  age: {
    type: Number,
    required: true,
    _id: false,
  },
  contact: {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    _id: false,
  },
  address: {
    road: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    _id: false,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      _id: false,
    },
  ],
  studentClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: "StudentClass",
      _id: false,
    },
  ],
});

// 在删除 Teacher 文档之前，更新所有关联的 StudentClass 和 Course 文档
teacherSchema.pre("remove", async function (next) {
  // const StudentClassModel = require("./studentClassModel"); // 引入 StudentClass 模型
  const CourseModel = require("./courseModel");
  await CourseModel.updateMany(
    { teacher: this._id },
    { $unset: { teacher: "" } } // 将 studentClass 字段置空
  );
  next();
});

module.exports = model("Teacher", teacherSchema);
