const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      message: "User Not Found",
    });
  }
  if (!existingUser.emailVerify) {
    return res.status(400).json({
      message: "Email Is Not Verified",
    });
  }
  bcrypt.compare(password, existingUser.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ email: existingUser.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
      res.json({
        message: "Login Successful",
        data: existingUser,
        token: token
      });
    } else {
      res.status(400).json({
        message: "Password Is Not Match",
      });
    }
  });
};
