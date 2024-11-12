// const pool = require('../config/db');
// const { updateSessionStatuses } = require('./updateStauts');

// // Function to book a session
// const bookSession = async (req, res) => {
//   // Get user ID from the authenticated user
//   const userId = req.user.user_id; // Assuming req.user is populated by your auth middleware
//   const { photographerId, sessionId } = req.body; // Get data from request body

//   // Insert the new booking into the booked_sessions table
//   // المفروض هون وقت الstauts 
//   // لحاله يتغير من نفس الداتا بيس 

//   const insertQuery = `
//     INSERT INTO booked_sessions (user_id, photographer_id, session_id)
//     VALUES ($1, $2, $3) RETURNING booked_session_id;
//   `;

//   // Update session status to 'pending' in available_sessions table
//   const updateStatusQuery = `
//     UPDATE available_sessions 
//     SET status = 'pending', updated_at = NOW()
//     WHERE session_id = $1;
//   `;

//   try {
//     // Update session statuses (e.g., from pending to active)
//     await updateSessionStatuses();

//     // Insert booking into booked_sessions
//     const result = await pool.query(insertQuery, [userId, photographerId, sessionId]);
//     const bookedSessionId = result.rows[0].booked_session_id;

//     // Update session status to 'pending' in available_sessions
//     await pool.query(updateStatusQuery, [sessionId]);

//     res.status(201).json({ message: 'Session booked successfully', bookedSessionId });
//   } catch (error) {
//     console.error('Error booking session:', error);
//     res.status(500).json({ message: 'Failed to book session', error });
//   }
// };

// module.exports = { bookSession };



// const pool = require('../config/db');
// const { updateSessionStatuses } = require('./updateStauts');

// // Function to book a session
// const bookSession = async (req, res) => {
//   // Get user ID from the authenticated user
//   const userId = req.user.user_id; // Assuming req.user is populated by your auth middleware
//   const { photographerId, sessionId } = req.body; // Get data from request body

//   // Query to get the session date from available_sessions
//   const getSessionDateQuery = `
//     SELECT session_date FROM available_sessions 
//     WHERE session_id = $1;
//   `;

//   // Query to check if the user already has a session on the same date
//   const checkUserSessionQuery = `
//     SELECT * FROM booked_sessions bs
//     JOIN available_sessions as ON bs.session_id = as.session_id
//     WHERE bs.user_id = $1 AND as.session_date = $2 AND bs.status IN ('pending', 'booked') AND bs.deleted = false;
//   `;

//   // Insert the new booking into the booked_sessions table
//   const insertQuery = `
//     INSERT INTO booked_sessions (user_id, photographer_id, session_id)
//     VALUES ($1, $2, $3) RETURNING booked_session_id;
//   `;

//   // Update session status to 'pending' in available_sessions table
//   const updateStatusQuery = `
//     UPDATE available_sessions 
//     SET status = 'pending', updated_at = NOW()
//     WHERE session_id = $1;
//   `;

//   try {
//     // Get the session date for the session being booked
//     const sessionDateResult = await pool.query(getSessionDateQuery, [sessionId]);
//     const sessionDate = sessionDateResult.rows[0]?.session_date;

//     if (!sessionDate) {
//       return res.status(400).json({ message: 'Session date not found' });
//     }

//     // Check if the user already has a booked or pending session on the same date
//     const userSessionResult = await pool.query(checkUserSessionQuery, [userId, sessionDate]);

//     if (userSessionResult.rows.length > 0) {
//       return res.status(400).json({ message: 'You already have a session booked or pending on this date' });
//     }

//     // Update session statuses (e.g., from pending to active)
//     await updateSessionStatuses();

//     // Insert booking into booked_sessions
//     const result = await pool.query(insertQuery, [userId, photographerId, sessionId]);
//     const bookedSessionId = result.rows[0].booked_session_id;

//     // Update session status to 'pending' in available_sessions
//     await pool.query(updateStatusQuery, [sessionId]);

//     res.status(201).json({ message: 'Session booked successfully', bookedSessionId });
//   } catch (error) {
//     console.error('Error booking session:', error);
//     res.json({ status: 'error', message: 'Failed to book session', error: error.message });
//   }
// };

// module.exports = { bookSession };
const pool = require('../config/db');
const { updateSessionStatuses } = require('./updateStauts');
const moment = require('moment');
// Function to book a session
const bookSession = async (req, res) => {
  // Get user ID from the authenticated user
  const userId = req.user.user_id; // Assuming req.user is populated by your auth middleware
  const { photographerId, sessionId, sessionDate } = req.body; // Get data from request body, including sessionDate
  const formattedSessionDate = moment(sessionDate).format('YYYY-MM-DD');
  // Query to check if the user has any booked or pending sessions on the same date
  console.log("Request body:", formattedSessionDate);

const checkQuery = `
  SELECT *
  FROM booked_sessions bs
  JOIN available_sessions a ON bs.session_id = a.session_id
  WHERE bs.user_id = $1 
  AND a.session_date = $2 
  AND bs.status IN ('pending', 'booked');
`;


  // Insert the new booking into the booked_sessions table
  const insertQuery = `
    INSERT INTO booked_sessions (user_id, photographer_id, session_id)
    VALUES ($1, $2, $3) RETURNING booked_session_id;
  `;

  // Update session status to 'pending' in available_sessions table
  const updateStatusQuery = `
    UPDATE available_sessions 
    SET status = 'pending', updated_at = NOW()
    WHERE session_id = $1;
  `;

  try {
    // Check if the user already has a booked or pending session for the same date
    
    await updateSessionStatuses();

    const checkResult = await pool.query(checkQuery, [userId, formattedSessionDate]);
    // console.log("checkResult session date", JSON.stringify(checkResult, null, 2));

    if (checkResult.rows.length === 0) {
     // Insert booking into booked_sessions
     const result = await pool.query(insertQuery, [userId, photographerId, sessionId]);
     const bookedSessionId = result.rows[0].booked_session_id;
 
     // Update session status to 'pending' in available_sessions
     await pool.query(updateStatusQuery, [sessionId]);
     
     res.status(201).json({ message: 'Session booked successfully', bookedSessionId });
    
    }
   else{

  return res.status(400).json({ message: 'You already have a booked or pending session on this date.' });

}
    // Update session statuses (e.g., from pending to active)
   
   

   
  } catch (error) {
    console.error('Error booking session:', error);
    res.status(500).json({ message: 'Failed to book session', error });
  }
};

module.exports = { bookSession };
