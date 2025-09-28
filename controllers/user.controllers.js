
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const { sendMail } = require("../utils/sendMail");
const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ error: "All fields are required" });
    }

    if (name.length < 2) {
      return res.json({ error: "Name must be at least 2 characters" });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.json({ error: "Invalid email format" });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.json({
        error:
          "Password must be at least 6 characters and contain letters & numbers",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      emailVerify:false,
      otp,
      otpExpire: new Date(Date.now() + 10 * 60 * 1000)
    });

    await newUser.save();
    sendMail(email, "Email Verification", otp);

    res.json({
      message: "User created successfully. Please verify OTP.",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: "Server error" });
  }
};
