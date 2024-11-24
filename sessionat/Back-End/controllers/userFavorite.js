const pool = require('./../config/db');

// Function to fetch photographers liked by a user
const getFavoritePhotographers = async (req, res) => {
  try {
    const userId = req.user.user_id; // Assuming you have user authentication middleware

    const query = `
      SELECT 
        u.user_id, 
        u.full_name, 
        u.email, 
        u.phone_number, 
        u.city, 
        u.profile_pic, 
        u.portfolio_link, 
        u.years_of_experience, 
        u.camera_and_equipment, 
        u.description, 
        u.category
      FROM favorites f
      JOIN users u ON f.photographer_id = u.user_id
      WHERE f.user_id = $1 AND f.is_deleted = false AND u.is_deleted = false AND u.role = 'photographer';
    `;

    const { rows } = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No favorite photographers found' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error fetching favorite photographers:', error);
    res.status(500).json({ error: 'Error fetching favorite photographers' });
  }
};

module.exports = { getFavoritePhotographers };
