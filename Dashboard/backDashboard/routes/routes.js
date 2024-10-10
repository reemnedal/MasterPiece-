const express = require("express");
const router = express.Router();

 const { fetchPhotographers } = require("../controllers/photographerController");
const { signup } = require("../controllers/signupController");
  
router.get('/photographer', fetchPhotographers);
router.post('/signup', signup);
 
  

module.exports = router;

