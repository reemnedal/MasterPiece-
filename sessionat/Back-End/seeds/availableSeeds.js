const pool = require('../config/db');

const insertFakeData = async () => {
    const query = `
      INSERT INTO available_sessions 
      (photographer_id, time_from, time_to, session_date, session_place, status, price, deleted, notes)
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const fakeData = [
        // Example data for available_sessions
        [2, '09:00:00', '11:00:00', '2024-10-05', 'Central Park, New York', 'active', 200.00, false, 'Outdoor nature shoot'],
        [4, '13:00:00', '15:00:00', '2024-10-06', 'Miami Beach', 'active', 300.00, false, 'Portrait session at the beach'],
        [5, '10:00:00', '12:00:00', '2024-10-07', 'Golden Gate Park, San Francisco', 'active', 250.00, false, 'Aerial drone photography session'],
        [6, '14:00:00', '16:00:00', '2024-10-08', 'Downtown Dallas', 'active', 180.00, false, 'Lifestyle shoot in urban setting'],
        [4, '17:00:00', '19:00:00', '2024-10-09', 'Everglades National Park', 'active', 350.00, false, 'Nature shoot focusing on wildlife'],
        [5, '11:00:00', '13:00:00', '2024-10-10', 'Golden Gate Bridge', 'active', 220.00, false, 'Architectural photography session'],
    ];

    try {
        for (const data of fakeData) {
            const res = await pool.query(query, data);
            console.log('Inserted session:', res.rows[0]);
        }
    } catch (error) {
        console.error('Error inserting fake data:', error);
    }
};

// Run the function to insert fake data
insertFakeData();
