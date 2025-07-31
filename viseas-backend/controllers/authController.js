const pool = require('../config/db');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure this line is added at the top if not already

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any SMTP provider (Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER,      // Your email address
    pass: process.env.EMAIL_PASSWORD   // Your email password or App Password
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Viseas" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email send error:', error.message);
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const conn = await pool.getConnection();
    const [existingUser] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      conn.release();
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await conn.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    conn.release();

    // Send registration email
    await sendEmail(
      email,
      'Registration Successful',
      `<h3>Welcome, ${name}!</h3><p>Your registration on Viseas was successful.</p>`
    );

    return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("❌ Register Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const conn = await pool.getConnection();
    const [userResult] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);

    if (userResult.length === 0) {
      conn.release();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = userResult[0];
    const isMatch = await bcrypt.compare(password, user.password);
    conn.release();

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Send login email
    await sendEmail(
      email,
      'Login Notification',
      `<h3>Hello, ${user.name}</h3><p>You have successfully logged in to your Viseas account.</p>`
    );

    return res.status(200).json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });

  } catch (error) {
    console.error("❌ Login Error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  register,
  login
};
