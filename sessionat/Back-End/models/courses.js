// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'courses' table
const createCoursesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS courses (
      course_id SERIAL PRIMARY KEY,                -- Unique ID for the course
      photographer_id INT NOT NULL,                -- Reference to the photographer (user_id)
      course_name VARCHAR(255) NOT NULL,           -- Name of the course
      content TEXT,                               -- Detailed content of the course
      duration INT,                               -- Duration of the course in hours
      start_date TIMESTAMP NOT NULL,              -- Start date and time of the course
      end_date TIMESTAMP,                         -- End date and time of the course
      is_online BOOLEAN DEFAULT false,            -- Whether the course is online or offline
      is_deleted BOOLEAN DEFAULT false,           -- Soft delete flag
      created_at TIMESTAMP DEFAULT NOW(),         -- Course creation timestamp
      updated_at TIMESTAMP DEFAULT NOW(),         -- Last updated timestamp
      FOREIGN KEY (photographer_id) REFERENCES users(user_id)  -- Reference to the photographer
    );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('Courses table created or already exists');
  } catch (error) {
    console.error('Error creating courses table:', error);
  }
};

// Initialize the table creation process
const initCourses = async () => {
  await createCoursesTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
initCourses();

