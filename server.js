const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes.js');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api', bookingRoutes);

// Initialize the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
