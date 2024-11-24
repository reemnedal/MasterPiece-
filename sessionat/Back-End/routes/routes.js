const pool = require("../config/db");

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
const { fetchAllCourses } = require("../controllers/getCourses");
const { DetailsPho } = require("../controllers/DetailsPhoEN");
const { GetPhotographerImages } = require("../controllers/getImagesForDetails");
const { allphotographers } = require("../controllers/fetchAllPhotographers");
const { addFavorite, removeFavorite, getFavorites } = require("../controllers/favourite");
const { getFavoritePhotographers } = require("../controllers/userFavorite");
const { completeSession,upload } = require("../controllers/completeSession");
    

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
router.get('/courses',fetchAllCourses); 

router.post('/upload/:sessionId',auth, upload.array('photos', 10), completeSession);

router.get('/phoDetails/:phoId',DetailsPho); 
router.get('/phoDetailsImages/:phoId',GetPhotographerImages); 
router.get('/allphotographers',allphotographers); 

router.post('/favorites/:phoId',auth ,addFavorite);

// Remove photographer from favorites
router.delete('/favorites/:phoId',auth, removeFavorite);
router.get('/favorites', auth, getFavorites);

router.get('/userfavorites', auth, getFavoritePhotographers);

router.get('/tips', async (req, res) => {
    try {
      const { rows: tips } = await pool.query(`
        SELECT t.*, u.full_name AS photographer_name
        FROM tips t
        JOIN users u ON t.photographer_id = u.user_id
        WHERE t.is_deleted = false
      `);
  
      res.json({ tips });
    } catch (error) {
      console.error('Error fetching tips:', error);
      res.status(500).send('Server error');
    }
  });
  
  // Fetch all categories
  router.get('/categories', async (req, res) => {
    try {
      const { rows: categories } = await pool.query('SELECT * FROM categories');
      res.json({ categories });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).send('Server error');
    }
  });
 
module.exports = router;

