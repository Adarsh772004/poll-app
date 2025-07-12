const nodemailer = require("nodemailer");

const sendResetEmail = async (userEmail, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Poll App" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Password Reset link",
    html: `
            <p>You requested a password reset.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link will expire in 15 minutes.</p>
        `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
