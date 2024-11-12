// this is get session by phoid

const pool = require("./../config/db");

const { updateSessionStatuses } = require("./updateStauts");

// Function to fetch available sessions for a specific photographer by phoId
const fetchAvailableSessionsByPhotographer = async (req, res) => {
  try {
    await updateSessionStatuses();

    const phoId = req.params.phoId; // Get photographer ID from request params

    const query = `
      SELECT * FROM available_sessions 
      WHERE photographer_id = $1 AND deleted = false AND status = 'active';
    `;

    const { rows } = await pool.query(query, [phoId]);

    // Check if sessions were found
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No available sessions found for this photographer' });
    }

    res.json(rows); // Return the list of available sessions
  } catch (error) {
    res.status(500).json({ error: 'Error fetching available sessions' });
  }
};



module.exports = { fetchAvailableSessionsByPhotographer };


 