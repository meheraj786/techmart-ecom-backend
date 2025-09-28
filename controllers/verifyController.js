const User = require("../models/user.model");

exports.verifyController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await User.updateOne(
      { email },
      {
        $set: { emailVerify: true },
        $unset: { otp: "", otpExpire: "" },
      }
    );

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
