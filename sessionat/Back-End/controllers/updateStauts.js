const pool = require('../config/db');

// This function updates sessions from 'pending' to 'active' or 'cancelled' based on the 24-hour rule
const updateSessionStatuses = async () => {
  // Query to update available_sessions to 'active' if they are still 'pending' after 24 hours
  const updateAvailableSessionsQuery = `
    UPDATE available_sessions
    SET status = 'active', updated_at = NOW()
    WHERE status = 'pending' 
    AND status_updated_at <= NOW() - INTERVAL '24 hours';
  `;
//   2 minutes

  // Query to update booked_sessions to 'cancelled' if they are still 'pending' after 24 hours
  const updateBookedSessionsQuery = `
    UPDATE booked_sessions
    SET status = 'cancelled', updated_at = NOW()
    WHERE status = 'pending' 
    AND status_updated_at <= NOW() - INTERVAL '24 hours';
  `;

  try {
    // Update available_sessions to 'active'
    const res1 = await pool.query(updateAvailableSessionsQuery);
    // console.log(`Updated ${res1.rowCount} available sessions to active.`);

    // Update booked_sessions to 'cancelled'
    const res2 = await pool.query(updateBookedSessionsQuery);
    // console.log(`Updated ${res2.rowCount} booked sessions to cancelled.`);

  } catch (error) {
    // console.error('Error updating session statuses:', error);
  }
};

// Export the function so it can be used elsewhere
module.exports = { updateSessionStatuses };

// Call this function whenever needed, such as in a scheduled job or after sessions are fetched
