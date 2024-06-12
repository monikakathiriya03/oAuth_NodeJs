const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionkey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
