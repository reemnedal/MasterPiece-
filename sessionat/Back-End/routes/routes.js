const express = require("express");
const router = express.Router();

 const { fetchPhotographers } = require("../controllers/photographerController");
const { signup } = require("../controllers/signupController");


const { loginUser } = require("../controllers/loginController");
const { auth } = require("../Middlewares/auth");
const { fetchPhotographerById } = require("../controllers/fetchPhotographerById");
const { fetchAvailableSessionsByPhotographer } = require("../controllers/availableSessionsByID");
const { bookSession } = require("../controllers/pendingSessions");
const { fetchSessionDetails } = require("../controllers/fetchSessionDetailsBysessionId");
const { processPayment } = require("../controllers/paymentController");
  

router.post('/login', loginUser);
// router.get('/photographer',auth ,fetchPhotographers);

router.get('/photographer',fetchPhotographers );
router.get('/photographer/:phoId',fetchPhotographerById);
router.get('/available_sessions/:phoId',fetchAvailableSessionsByPhotographer);
router.post('/booked_sessions',auth,bookSession);
router.get('/session_details/:sessionId', fetchSessionDetails);
router.get('/photographer/:photographerId', fetchPhotographerById);
router.post('/process_payment', auth, processPayment); 
router.post('/signup', signup);
 
  

module.exports = router;

