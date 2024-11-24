// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'attendees' table
const createAttendeesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS attendees (
      attendee_id SERIAL PRIMARY KEY,             -- Unique ID for the attendee record
      user_id INT NOT NULL,                       -- Reference to the user (user_id)
      course_id INT NOT NULL,                     -- Reference to the course (course_id)
      is_deleted BOOLEAN DEFAULT false,           -- Soft delete flag for the attendee
      enrolled_at TIMESTAMP DEFAULT NOW(),        -- Timestamp when the user enrolled in the course
      FOREIGN KEY (user_id) REFERENCES users(user_id),  -- Reference to the user
      FOREIGN KEY (course_id) REFERENCES courses(course_id)  -- Reference to the course
    );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('Attendees table created or already exists');
  } catch (error) {
    console.error('Error creating attendees table:', error);
  }
};

// Initialize the table creation process
const initAttendees = async () => {
  await createAttendeesTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
initAttendees();
