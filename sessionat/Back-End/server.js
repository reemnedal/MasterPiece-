const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const jwtDecode = require('jwt-decode'); // This should work fine with CommonJS
// const cookie = require('cookie');
 
const connectDB = require("./config/db"); 


// Connect to MongoDB
connectDB(process.env.MONGO_URL);

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

  
app.use('/api', favoritesRoutes);
app.use('/api', ratingsRoutes);  
 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
