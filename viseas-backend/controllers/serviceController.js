// controllers/serviceController.js
const Razorpay = require('razorpay');

// Dummy service list (you may later fetch this from DB)
const services = [
  {
    id: 1,
    title: "Business Visa",
    description: "Fast processing for corporate travelers...",
    price: 299
  },
  {
    id: 2,
    title: "Tourist Visa",
    description: "Leisure travel visas...",
    price: 199
  },
  {
    id: 3,
    title: "Student Visa",
    description: "Study abroad assistance...",
    price: 349
  }
];

// ✅ Route to get all services
exports.getAllServices = async (req, res) => {
  try {
    res.json({ services });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Razorpay Order Creation
exports.createOrder = async (req, res) => {
  console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);

  try {
    const { serviceId } = req.body;
    const service = services.find(s => s.id === serviceId);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: service.price * 100, // in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      service
    });

  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ error: 'Payment order creation failed' });
  }
};
