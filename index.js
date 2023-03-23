const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authenticationRoutes = require('./src/routes/authRoutes');
const marketDataRoutes = require('./src/routes/marketDataRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const portfolioRoutes = require('./src/routes/portfolioRoutes');
const userManagementRoutes = require('./src/routes/userManagementRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const authenticationMiddleware = require('./src/middlewares/authMiddleware')
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
}).catch((error) => {
  console.log(`Failed to connect to MongoDB database: ${error}`);
});

// Set up JSON body parsing middleware
app.use(bodyParser.json());

// Set up API endpoints
app.use('/auth', authenticationRoutes);
app.use('/market', marketDataRoutes);
app.use('/notifications', notificationRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/users', userManagementRoutes);

// Set up error middleware
app.use(errorMiddleware);

app.use(authenticationMiddleware)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});