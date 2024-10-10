const pool = require("./../config/db");

// Function to fetch a specific photographer by phoId
const fetchPhotographerById = async (req, res) => {
  try {
    const phoId = req.params.phoId; // Get the ID from the request parameters

    const query = `
      SELECT * FROM users 
      WHERE user_id = $1 AND role = 'photographer' AND is_deleted = false;
    `;

    const { rows } = await pool.query(query, [phoId]);

    // Check if the photographer was found
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Photographer not found' });
    }

    res.json(rows[0]); // Return the photographer's data
  } catch (error) {
    res.status(500).json({ error: 'Error fetching photographer' });
  }
};

module.exports = { fetchPhotographerById };
