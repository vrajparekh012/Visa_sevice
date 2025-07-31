const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,       // your Gmail address
        pass: process.env.EMAIL_PASSWORD,   // your app password (NOT your Gmail password)
      },
    });

    await transporter.sendMail({
      from: `"Viseas Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log('Email sent to', to);
  } catch (error) {
    console.error('Email failed to send:', error);
  }
};

module.exports = sendEmail;
