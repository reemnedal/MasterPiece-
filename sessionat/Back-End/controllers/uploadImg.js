// controllers/photographer.js

const multer = require('multer');
const pool = require('../config/db');

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Controller function for profile picture upload
const uploadProfilePic = async (req, res) => {
  const userId = req.user.user_id; // Assuming `auth` middleware sets `req.user`
  const profilePicPath = `/uploads/${req.file.filename}`;

  try {
    const query = 'UPDATE users SET profile_pic = $1 WHERE user_id = $2 RETURNING profile_pic';
    const result = await pool.query(query, [profilePicPath, userId]);

    res.json({ profile_pic: result.rows[0].profile_pic });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Export both `upload` and `uploadProfilePic` so `upload` can be used in the router
module.exports = {
  upload,
  uploadProfilePic,
};
