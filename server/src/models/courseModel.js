const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    notEmpty: true,
  },
  description: {
    type: String,
    requires: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    // requires: true,
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
});

//	1.	students: [...]：表示一个名为 students 的字段，这个字段是一个数组。
//	2.	type: Schema.Types.ObjectId：表示数组中的每个元素的类型是 ObjectId。ObjectId 是 MongoDB 用来唯一标识文档的类型。
//	3.	ref: "Student"：ref 属性用于建立引用关系。它告诉 Mongoose，这个 ObjectId 引用的是 Student 模型中的一个文档。

const Course = model("Course", courseSchema);

module.exports = Course;
