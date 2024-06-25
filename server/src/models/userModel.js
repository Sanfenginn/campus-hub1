const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
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
  dob: {
    type: Date,
    required: true,
    set: (value) => {
      if (typeof value === "string") {
        return new Date(value);
      }
      return value;
    },
  },
  age: {
    type: Number,
    // required: true,
  },
  account: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    userType: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      refPath: "role.userTypeRef",
    },
    roleInfo: { type: Schema.Types.ObjectId, ref: "Role" },
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
    houseNumber: {
      type: String,
      // required: true,
    },
    street: {
      type: String,
      // required: true,
    },
    suburb: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    postalCode: {
      type: String,
      // required: true,
    },
    _id: false,
  },
});

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// 动态设置引用的路径
userSchema.virtual("role.userTypeRef").get(function () {
  return this.role.userType === "student"
    ? "Student"
    : this.role.userType === "teacher"
    ? "Teacher"
    : this.role.userType === "admin"
    ? "Admin"
    : null;
});

module.exports = model("User", userSchema);
