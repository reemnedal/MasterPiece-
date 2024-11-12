// Import the database pool from config
const pool = require("./../config/db");

// Function to fetch session details by session ID
const fetchSessionDetailsByAuth = async (req, res) => {
    const phoId = req.user.user_id; // Assuming you have user authentication middleware

  try {
    // Query to fetch the session details based on sessionId
    const query = `
      SELECT * FROM available_sessions 
      WHERE photographer_id = $1 AND deleted = false;
    `;

    // Execute the query usisng the sessionId
    const { rows } = await pool.query(query, [phoId]);

    // Check if any session was found
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Return the session details
    res.json(rows); // This returns all sessions// Return the first (and only) session found
  } catch (error) {
    console.error('Error fetching session details:', error);
    res.status(500).json({ error: 'Error fetching session details' });
  }
};

// Export the function
module.exports = { fetchSessionDetailsByAuth };
