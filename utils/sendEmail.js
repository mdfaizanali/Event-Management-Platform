const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"Event Platform" <${process.env.EMAIL}>`,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;
