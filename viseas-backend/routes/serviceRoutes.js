// routes/serviceRoutes.js
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
require('dotenv').config();
 // 🔥 This loads your .env file!


// Existing route
router.get('/', serviceController.getAllServices);

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🆕 Razorpay order creation route
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: "receipt_" + Math.floor(Math.random() * 1000000),
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Something went wrong while initiating payment." });
    console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);

  }
});

module.exports = router;
