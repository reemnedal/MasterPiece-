// controllers/sessionController.js
const pool = require("../config/db");

const fetchAvailableSessions = async (req, res) => {
  try {
    const query = `
      SELECT 
        s.session_id, s.time_from, s.time_to, s.session_date, s.session_place, s.status, s.price, s.notes,
        u.full_name AS photographer_name,u.user_id AS photographer_id, u.city AS photographer_city, u.years_of_experience, u.camera_and_equipment
      FROM available_sessions s
      JOIN users u ON s.photographer_id = u.user_id
      WHERE s.deleted = false AND u.role = 'photographer'AND s.status = 'active'; 
    `;
    
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching available sessions' });
  }
};

module.exports = { fetchAvailableSessions };
