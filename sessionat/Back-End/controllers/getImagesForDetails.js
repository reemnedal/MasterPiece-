const pool = require("./../config/db");

// Function to fetch images for a specific photographer
const GetPhotographerImages = async (req, res) => {
  try {
    // Assuming the photographer ID is either passed in the request params or hardcoded
const phoId = req.params.phoId;    // const phoId = 11; // Replace with req.params.id if using dynamic IDs

    const query = `
      SELECT img_url, created_at, updated_at 
      FROM photographer_images
      WHERE photographer_id = $1 AND is_deleted = false;
    `;

    const { rows } = await pool.query(query, [phoId]);

    // Check if images exist for the photographer
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No images found for this photographer' });
    }

    res.json(rows); // Return the list of images
  } catch (error) {
    console.error('Error fetching photographer images:', error);
    res.status(500).json({ error: 'Error fetching photographer images' });
  }
};

module.exports = { GetPhotographerImages };
