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

module.exports = model("Teacher", teacherSchema);
