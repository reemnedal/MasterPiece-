const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./config/db");  
const app = express();
const routes = require('./routes/routes');
app.use(bodyParser.json());

app.use(cors());


 app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use('/api', routes);
 
 const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
