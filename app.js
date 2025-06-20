const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use('/api/v1/restakers', require('./routes/restakers'));
app.use('/api/v1/validators', require('./routes/validators'));
app.use('/api/v1/rewards', require('./routes/rewards'));

// Root route
app.get('/', (req, res) => {
  res.json({ status: 'API Running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
