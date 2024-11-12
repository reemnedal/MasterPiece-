const pool = require("./../config/db");

// Function to fetch a specific photographer by phoId
const fetchUserByAuth = async (req, res) => {
  try {
    const phoTd = req.user.user_id; // Assuming you have user authentication middleware

    const query = `
      SELECT * FROM users 
      WHERE user_id = $1 AND role = 'user' AND is_deleted = false;
    `;

    const { rows } = await pool.query(query, [phoTd]);

    // Check if the photographer was found
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(rows[0]); // Return the photographer's data
  } catch (error) {
    res.status(500).json({ error: 'Error fetching User' });
  }
};

module.exports = { fetchUserByAuth };