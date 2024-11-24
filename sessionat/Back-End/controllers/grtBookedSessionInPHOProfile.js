// Import the database pool from config
const pool = require('../config/db');

// Function to get booked sessions along with user and session details
const getBookedSessions = async (req, res) => {
  try {
    const phoId = req.user.user_id; // Get the photographer's ID from the request user data

    // Query to get the booked sessions along with user details and session details
    const query = `
      SELECT 
        bs.booked_session_id,
        bs.status,
        bs.status_updated_at,
        bs.created_at AS booking_date,
        u.phone_number,
        u.email,
        u.city,
        u.user_id,
        asess.session_id,
        asess.time_from,
        asess.time_to,
        asess.session_date,
        asess.session_place,
        asess.price,
        asess.status AS session_status
      FROM booked_sessions bs
      JOIN users u ON u.user_id = bs.user_id  -- Join with users table for user details
      JOIN available_sessions asess ON asess.session_id = bs.session_id  -- Join with available_sessions table for session details
      WHERE bs.photographer_id = $1  -- Filter by photographer's ID
      AND bs.deleted = false  -- Exclude deleted sessions
    `;

    const { rows } = await pool.query(query, [phoId]);

    // Check if any booked sessions were found
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No booked sessions found' });
    }

    // Return the fetched sessions data
    res.json({ bookedSessions: rows });
  } catch (error) {
    console.error('Error fetching booked sessions:', error);
    res.status(500).json({ error: 'Error fetching booked sessions' });
  }
};

module.exports = { getBookedSessions };
