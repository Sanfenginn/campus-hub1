const { Schema, model } = require("mongoose");

const studentClassSchema = new Schema({
  className: {
    type: String,
    required: true,
    notEmpty: true,
  },
  students: [
    {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    },
  ],
});

const StudentClass = model("StudentClass", studentClassSchema);

module.exports = StudentClass;
