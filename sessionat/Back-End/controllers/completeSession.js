const multer = require('multer');
const path = require('path');
const pool = require("./../config/db");

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the folder where files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const completeSession = async (req, res) => {
    try {
      const { session_id, user_id } = req.query;  // Extract from query params
  
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No image files uploaded' });
      }
  
      const getSessionQuery = 'SELECT photographer_id FROM booked_sessions WHERE booked_session_id = $1';
      const sessionResult = await pool.query(getSessionQuery, [session_id]);
  
      if (sessionResult.rows.length === 0) {
        return res.status(404).json({ error: 'Session not found' });
      }
  
      const photographerId = sessionResult.rows[0].photographer_id;
  
      // Update session status to completed
      const updateSessionQuery = 'UPDATE booked_sessions SET status = $1 WHERE booked_session_id = $2';
      await pool.query(updateSessionQuery, ['completed', session_id]);
  
      // Insert images into the database
      const insertImageQuery = 'INSERT INTO photographer_images (photographer_id, session_id, img_url) VALUES ($1, $2, $3)';
      for (const file of files) {
        const imgUrl = `/uploads/${file.filename}`;
        await pool.query(insertImageQuery, [user_id, session_id, imgUrl]);
      }
  
      res.status(200).json({
        success: true,
        message: 'Session completed and images uploaded',
      });
    } catch (error) {
      console.error('Error completing session:', error);
      res.status(500).json({ error: 'Error completing session', details: error.message });
    }
  };

module.exports = { completeSession, upload };