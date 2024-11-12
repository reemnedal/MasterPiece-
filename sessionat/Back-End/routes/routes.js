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
const { fetchUserByAuth } = require("../controllers/fetchUserByAuth");
const { updateUserProfile } = require("../controllers/editUserProfileData");
const { fetchBookedSessions } = require("../controllers/sessionForProfile");
const { fetchAvailableSessions } = require("../controllers/catalog");
const { fetchAvailableProducts } = require("../controllers/getProducts");
const { addToCart } = require("../controllers/addToCart");
const { fetchCartItems } = require("../controllers/getProductsIncart");
const { deleteCartItem } = require("../controllers/deleteItemFromCart");
const { createPaymentIntent, processOrder, createPayment } = require("../controllers/payforproducts");
  

router.post('/login', loginUser);
// router.get('/photographer',auth ,fetchPhotographers);
router.get('/photographer',fetchPhotographers);
router.get('/photographer/:phoId',fetchPhotographerById);
router.get('/available_sessions/:phoId',fetchAvailableSessionsByPhotographer);
router.post('/booked_sessions',auth,bookSession);
router.get('/session_details/:sessionId', fetchSessionDetails);
router.get('/photographer/:photographerId', fetchPhotographerById);
router.post('/process_payment', auth, processPayment); 
router.post('/signup', signup);
router.get('/userProfile', auth,fetchUserByAuth);
router.put('/userProfile',auth, updateUserProfile);
router.get('/bookedSessions',auth,fetchBookedSessions);
router.get('/catalog',fetchAvailableSessions);
router.get('/products',fetchAvailableProducts);
router.post('/cart',auth,addToCart);
router.get('/productInCart', auth,fetchCartItems);
router.delete('/removeProduct/:itemId',auth,deleteCartItem); 
router.post('/createPaymentproduct',auth,createPayment); 
 

module.exports = router;

