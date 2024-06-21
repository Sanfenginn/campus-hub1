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
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  studentClass: [
    {
      type: Schema.Types.ObjectId,
      ref: "StudentClass",
    },
  ],
});

module.exports = model("Teacher", teacherSchema);
