const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/nursery-garden', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
const appointmentsRoute = require('./routes/appointments');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users'); // Import user routes

// Using the routes
app.use('/api/appointments', appointmentsRoute);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes); // Use user routes

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('An error occurred:', err);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});