// Import the database pool from config
const pool = require('../config/db');

// Function to fetch all courses
const fetchAllCourses = async (req, res) => {
  try {
    const query = `
      SELECT * FROM courses 
      WHERE is_deleted = false;  -- Optionally filter out deleted courses
    `;

    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No courses found' });
    }

    res.json(rows); // Return all courses
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
};

module.exports = { fetchAllCourses };
