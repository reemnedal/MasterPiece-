const pool = require("./../config/db");

const fetchBookedSessions = async (req, res) => {
    try {
      const userId = req.user.user_id;
  
      const pendingQuery = `
        SELECT 
        bs.session_id,
        bs.status,
        avs.session_date,
        avs.session_place,
        avs.time_from,
        avs.time_to,
        avs.price,              /* Make sure price is included */
        avs.photographer_id,    /* Make sure photographer_id is included */
        u.full_name AS photographer_name,
        u.email AS photographer_email,
        u.phone_number AS photographer_phone
    FROM booked_sessions bs
    JOIN available_sessions avs ON bs.session_id = avs.session_id
    JOIN users u ON avs.photographer_id = u.user_id
    WHERE bs.user_id = $1 AND bs.status = 'pending' AND bs.deleted = false;      `;
      const { rows: pendingSessions } = await pool.query(pendingQuery, [userId]);
  
      const bookedQuery = `
        SELECT 
          bs.session_id,
          bs.status,
          bs.created_at,
          avs.session_date,
          avs.session_place,
          avs.time_from,
          avs.time_to,
          avs.price,
 
          u.full_name AS photographer_name,
          u.email AS photographer_email,
          u.phone_number AS photographer_phone -- Update here
        FROM booked_sessions bs
        JOIN available_sessions avs ON bs.session_id = avs.session_id
        JOIN users u ON avs.photographer_id = u.user_id
        WHERE bs.user_id = $1 AND bs.status = 'booked' AND bs.deleted = false;
      `;
      const { rows: bookedSessions } = await pool.query(bookedQuery, [userId]);
  
      res.json({ 
        pendingSessions, 
        bookedSessions,
        success: true
      });
  
    } catch (error) {
      console.error('Error fetching booked sessions:', error);
      res.status(500).json({ 
        error: 'Failed to fetch booked sessions', 
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        success: false 
      });
    }
  };
  
module.exports = { fetchBookedSessions };