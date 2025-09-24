const nodemailer = require("nodemailer");

exports.sendMail = async (to, subject, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "meherajhosen786@gmail.com",
        pass: "xujvogqxjoljbxnm",
      },
    });

    const text = `Your OTP code is: ${otp}`;
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 400px; margin: auto; background: #fafafa;">
        <h2 style="color: #4CAF50; text-align: center;">Techmart Verification</h2>
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">Your OTP code is:</p>
        <h1 style="text-align: center; background: #4CAF50; color: white; padding: 10px; border-radius: 8px;">
          ${otp}
        </h1>
        <p style="font-size: 14px; color: #555;">This code will expire in 10 minutes. Please do not share it with anyone.</p>
        <p style="margin-top: 20px; font-size: 14px; color: #777;">Best Regards,<br/>Techmart Team</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: '"Techmart" <meherajhosen786@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Mail send error:", error);
    return false;
  }
};
