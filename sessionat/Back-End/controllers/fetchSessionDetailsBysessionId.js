// Import the database pool from config
const pool = require("./../config/db");

// Function to fetch session details by session ID
const fetchSessionDetails = async (req, res) => {
  const { sessionId } = req.params; // Extract sessionId from request parameters

  try {
    // Query to fetch the session details based on sessionId
    const query = `
      SELECT * FROM available_sessions 
      WHERE session_id = $1 AND deleted = false;
    `;

    // Execute the query using the sessionId
    const { rows } = await pool.query(query, [sessionId]);

    // Check if any session was found
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Return the session details
    res.json(rows[0]); // Return the first (and only) session found
  } catch (error) {
    console.error('Error fetching session details:', error);
    res.status(500).json({ error: 'Error fetching session details' });
  }
};

// Export the function
module.exports = { fetchSessionDetails };
