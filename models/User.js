const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minLenght: 10,
      maxLength: 100,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minLenght: 2,
      maxLength: 255,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLenght: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
