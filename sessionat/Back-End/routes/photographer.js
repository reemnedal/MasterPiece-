const express = require("express");
const { fetchPhotographerByAuth } = require("../controllers/fetchPhotographerByAuth");
const { auth } = require("../Middlewares/auth");
const { fetchSessionDetailsByAuth } = require("../controllers/phoSessionByAuth");
const { updateSessionDetails } = require("../controllers/updateSessionPhoProfile");
const { softDeleteSession } = require("../controllers/softDeleteSessionsPhoProfile");
const { addSession } = require("../controllers/addNewSession");
const { editPhotographerProfile } = require("../controllers/editPhoProfile");
const { photographerSignup } = require("../controllers/signupphotographer");
const { fetchBookedSessions } = require("../controllers/sessionForProfile");
  const router = express.Router();
  const { upload, uploadProfilePic } = require("../controllers/uploadImg");
  const { uploadMultipleImages } = require("../controllers/multiImgs");
const { fetchImagesByPhotographerId, deleteImage } = require("../controllers/fetchMultiImgByAuth");
const { getBookedSessions } = require("../controllers/grtBookedSessionInPHOProfile");
const { completeSession } = require("../controllers/completeSession");
 
  // Profile picture upload route
  router.post('/uploadProfilePic', auth, upload.single('profile_pic'), uploadProfilePic);
// Add this to your existing routes
// In your router file
router.post('/uploadMultipleImages', auth, upload.array('images', 10), uploadMultipleImages);

router.get('/phoProfile', auth,fetchPhotographerByAuth);
router.get('/profilePortfolio', auth,fetchImagesByPhotographerId);
router.delete('/deleteImage/:imageId',auth ,deleteImage)
router.get('/fetchSessionDetailsByAuth', auth ,fetchSessionDetailsByAuth);
router.put('/updateSession/:session_id', auth, updateSessionDetails);
router.put('/deleteSession/:sessionId', softDeleteSession);
router.post('/signup/photographer', photographerSignup);
router.post('/addSession',auth, addSession);
router.put('/phoProfile',auth, editPhotographerProfile);
router.get('/bookedSessions',auth, getBookedSessions);


module.exports = router;

