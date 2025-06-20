const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
const restakerRoutes = require('./routes/restakers');
const validatorRoutes = require('./routes/validators');
const rewardRoutes = require('./routes/rewards');

app.use('/api/v1/restakers', restakerRoutes);
app.use('/api/v1/validators', validatorRoutes);
app.use('/api/v1/rewards', rewardRoutes);

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});