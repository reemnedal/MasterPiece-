const pool = require('./../config/db');

 const editPhotographerProfile = async (req, res) => {
  try {
    const phoId = req.user.user_id; // Assuming you have user authentication middleware
    const { full_name, email, phone_number, city, years_of_experience, camera_and_equipment, description } = req.body; // Get data from request body

    // Query to update the photographer's profile
    const query = `
      UPDATE users
      SET 
        full_name = $1,
        email = $2,
        phone_number = $3,
        city = $4,
        years_of_experience = $5,
        camera_and_equipment = $6,
        description = $7,
        updated_at = NOW()
      WHERE user_id = $8
      RETURNING *;  
    `;

    const { rows } = await pool.query(query, [full_name, email, phone_number, city, years_of_experience, camera_and_equipment, description, phoId]);

    // Check if the profile was updated
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Photographer not found' });
    }

    res.json({ message: 'Profile updated successfully', profile: rows[0] }); // Return updated profile details
  } catch (error) {
    console.error('Error updating photographer profile:', error);
    res.status(500).json({ error: 'Error updating photographer profile' });
  }
};

module.exports = { editPhotographerProfile };
