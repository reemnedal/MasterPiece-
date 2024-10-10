const express = require("express");
const { fetchPhotographerByAuth } = require("../controllers/fetchPhotographerByAuth");
const { auth } = require("../Middlewares/auth");
const { fetchSessionDetailsByAuth } = require("../controllers/phoSessionByAuth");
const { updateSessionDetails } = require("../controllers/updateSessionPhoProfile");
const { softDeleteSession } = require("../controllers/softDeleteSessionsPhoProfile");
const { addSession } = require("../controllers/addNewSession");
const { editPhotographerProfile } = require("../controllers/editPhoProfile");
 const router = express.Router();

 

router.get('/phoProfile', auth,fetchPhotographerByAuth);
router.get('/fetchSessionDetailsByAuth', auth ,fetchSessionDetailsByAuth);
router.put('/updateSession/:session_id', auth, updateSessionDetails);
router.put('/deleteSession/:sessionId', softDeleteSession);
router.post('/addSession',auth, addSession);
router.put('/phoProfile',auth, editPhotographerProfile);

module.exports = router;

