const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
    emailVerify: {
      type: Boolean,

    },
    otp: {
      type: String, 
      required: true,
    },
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
