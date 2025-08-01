const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./config/db');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(morgan('dev'));

// ✅ Route Imports
const countryRoutes = require('./routes/countryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const authRoutes = require('./routes/authRoutes');

// ✅ Route Mounting
app.use('/api/v1/countries', countryRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/auth', authRoutes);  // /register and /login live here

// ✅ Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('✅ Visa Service API is running...');
});

// ✅ 404 Fallback
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    suggestion: 'Try /api/v1/auth/register or /api/v1/auth/login'
  });
});

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development'
      ? err.message
      : 'Internal Server Error'
  });
});

// ✅ Start Server
const PORT = 5000;

async function startServer() {
  try {
    const connection = await pool.getConnection();
    await connection.ping(); // Check DB connection
    connection.release();
    console.log('✅ Connected to MySQL Database');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
}

startServer();
