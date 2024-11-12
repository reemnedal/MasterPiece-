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

// Create upload middleware
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Controller function for profile picture upload
const uploadProfilePic = async (req, res) => {
  const userId = req.user.user_id;
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

// Controller function for multiple images upload
const uploadMultipleImages = async (req, res) => {
  const userId = req.user.user_id;
  try {
    const images = req.files.map(file => ({
      photographer_id: userId,
      img_url: `/uploads/${file.filename}`
    }));

    // Insert multiple images into the database
    const values = images.map((_, index) => 
      `($${index * 2 + 1}, $${index * 2 + 2})`
    ).join(',');
    
    const query = `
      INSERT INTO photographer_images (photographer_id, img_url)
      VALUES ${values}
      RETURNING *
    `;

    const flattenedValues = images.reduce((acc, img) => 
      [...acc, img.photographer_id, img.img_url], []
    );

    const result = await pool.query(query, flattenedValues);
    res.json(result.rows);
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  upload,
  uploadProfilePic,
  uploadMultipleImages
};