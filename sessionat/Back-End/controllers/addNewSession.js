// Import the database pool from config
const pool = require("./../config/db");
// Function to add a new session
const addSession = async (req, res) => {
    const phoId = req.user.user_id; // Assuming you have user authentication middleware

  const {
    time_from,
    time_to,
    session_date,
    session_place,
    price,
    notes
  } = req.body; // Extract the session details from the request body

  // Validation: Ensure all required fields are provided
  if ( !time_from || !time_to || !session_date ||  !session_place || !price || !notes) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Query to insert a new session into the available_sessions table
    const query = `
      INSERT INTO available_sessions 
      (photographer_id, time_from, time_to, session_date, session_place, price, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    // Execute the query with the provided data
    const { rows } = await pool.query(query, [
      
      phoId,
      time_from,
      time_to,
      session_date,
      session_place,
      price,
      notes // Insert null if notes are not provided
    ]);

    // Return the newly created session as a response
    res.status(201).json(rows[0]); // Send the newly created session as JSON
  } catch (error) {
    console.error('Error adding new session:', error);
    res.status(500).json({ error: 'Error adding new session' });
  }
};

// Export the addSession function
module.exports = { addSession };
