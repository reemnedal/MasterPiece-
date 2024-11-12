const pool = require('./../config/db');

// Function to update user profile data
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.user_id; // Assuming user authentication middleware provides `user_id`
    const { full_name, email, phone_number, city } = req.body;

    const query = `
      UPDATE users 
      SET full_name = $1, email = $2, phone_number = $3, city = $4, updated_at = NOW()
      WHERE user_id = $5 AND is_deleted = false
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [full_name, email, phone_number, city, userId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user: rows[0] });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};

module.exports = {  updateUserProfile };
