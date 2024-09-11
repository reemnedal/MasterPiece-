const express = require("express");
const router = express.Router();

const {fetchDishes} = require("../controllers/fetchDishes");
const { fetchChefs } = require("../controllers/fetchChefs");
 const { addToCart } = require("../controllers/addToCart");
const { fetchOrder } = require("../controllers/fetchOrder");
const { deleteFromCart } = require("../controllers/deleteFromCart");
const {updatequantity } = require("../controllers/updatequantities");
const { fetchDishDetails } = require("../controllers/fetchDishDetails");
 const favorites = require('../controllers/favorites'); 
const { createReport, checkReportStatus } = require("../controllers/report");
const { createRating, checkRatingStatus, addRating } = require("../controllers/rating");
const { createComment, getComments, deleteComment } = require("../controllers/dishcomment");
const { search } = require("../controllers/searchchef");
const { searchDishes } = require("../controllers/searchdish");
const { getDishesByCategory } = require("../controllers/categorydish");
  
router.get('/fetchDishes/:id', fetchDishes);
router.get("/fetchChefs", fetchChefs);
router.get('/fetchDishDetails/:id', fetchDishDetails);
router.post('/addToCart',addToCart);  
router.get('/fetchOrder/:userId',fetchOrder);  
router.delete('/deleteFromCart/:id',deleteFromCart);  
router.post('/updatequantity',updatequantity);  
// Add a dish to favorites
router.post('/favorites', favorites.addDishToFavorites);

// Remove a dish from favorites
router.delete('/favorites', favorites.removeDishFromFavorites);

// Check if a dish is favorited
router.get('/favorites/:userId/:dishId', favorites.checkFavoriteStatus);

router.post('/reports', createReport);

router.get('/reports/:userId/:targetId', checkReportStatus);

// Route to create a new rating

// POST route to add or update a rating
router.post('/ratings',addRating);

// GET route to check rating status
// router.get('/ratings/status/:userId/:targetId', checkRatingStatus);


router.post('/comments', createComment);

// Route to fetch comments for a specific dish
router.get('/comments/:targetId', getComments);

// Route to delete a comment
router.delete('/comments/:commentId', deleteComment);

// Route for searching chefs

router.get('/searchChefs', search);


router.get('/searchDishes', searchDishes);

// Route for fetching dishes by category
router.get('/dishes/:category', getDishesByCategory);

module.exports = router;

