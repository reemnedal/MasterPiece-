// Import the database pool from config
const pool = require("../config/db");

// Function to update a session by session ID
const updateSessionDetails = async (req, res) => {
   const { session_id } = req.params; // Extract session_id from request parameters
  const { session_date, time_from, time_to, session_place, status, price, notes } = req.body; // Extract details from request body

  try {
    // Query to update the session details
    const query = `
      UPDATE available_sessions
      SET 
        session_date = $1,
        time_from = $2,
        time_to = $3,
        session_place = $4,
        status = $5,
        price = $6,
        notes = $7,
        updated_at = NOW()  -- Update the timestamp
      WHERE session_id = $8 AND photographer_id = $9 AND deleted = false
      RETURNING *;
    `;

    const values = [
      session_date,    // New session date
      time_from,       // Start time of session
      time_to,         // End time of session
      session_place,   // Location of session
      status,          // Status of session (e.g., active, completed)
      price,           // Price for the session
      notes,           // Additional notes
      session_id,      // The session ID to update
      phoId            // The photographer's ID to ensure ownership
    ];

    // Execute the query
    const { rows } = await pool.query(query, values);

    // Check if the session was updated
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Session not found or not authorized' });
    }

    // Return the updated session details
    res.json(rows[0]); // Return the updated session as the response
  } catch (error) {
    console.error('Error updating session details:', error);
    res.status(500).json({ error: 'Error updating session details' });
  }
};

module.exports = { updateSessionDetails };
