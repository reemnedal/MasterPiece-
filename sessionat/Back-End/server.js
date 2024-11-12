const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');    
const pool = require("./config/db");  
const app = express();
const routes = require('./routes/routes');
const photographer = require('./routes/photographer');
const path = require('path');
app.use(bodyParser.json());
app.use(cookieParser());                   
// Middleware
app.use(express.json()); 
 
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


 app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routes);
app.use('/api/pho', photographer);
 
 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
