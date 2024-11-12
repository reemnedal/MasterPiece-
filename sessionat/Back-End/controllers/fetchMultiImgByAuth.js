// Import the database pool from config
const pool = require("./../config/db");

// Function to fetch images by photographer ID
const fetchImagesByPhotographerId = async (req, res) => {
  const photographerId = req.user.user_id; // Assuming you have user authentication middleware

  try {
    // Query to fetch images based on photographerId
    const query = `
      SELECT * FROM photographer_images 
      WHERE photographer_id = $1 AND is_deleted = false;
    `;

    // Execute the query using the photographerId
    const { rows } = await pool.query(query, [photographerId]);

    // Check if any images were found
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No images found' });
    }

    // Return the images
    res.json({ photographer_images: rows });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Error fetching images' });
  }
};

// Export the function
module.exports = { fetchImagesByPhotographerId };
