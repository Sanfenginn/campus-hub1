const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  role: {
    type: String,
    required: true,
    _id: false,
  },
  permissions: [
    {
      type: String,
      required: true,
      _id: false,
    },
  ],
});

module.exports = model("Role", roleSchema);
