const pool = require('./../config/db');

// Function to soft delete a session by sessionId (mark as deleted)
const softDeleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params; // Get sessionId from the request parameters

    // Query to update the is_deleted field instead of deleting the row
    const query = `
      UPDATE available_sessions 
      SET deleted = true 
      WHERE session_id = $1 
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [sessionId]);

    // Check if the session was found and updated
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Session not found or already deleted' });
    }

    res.json({ message: 'Session marked as deleted', session: rows[0] }); // Return updated session details
  } catch (error) {
    console.error('Error soft deleting session:', error);
    res.status(500).json({ error: 'Error soft deleting session' });
  }
};

module.exports = { softDeleteSession };
