// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'photographer_images' table
const createPhotographerImagesTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS photographer_images (
      image_id SERIAL PRIMARY KEY,                 -- Unique identifier for the image
      photographer_id INT NOT NULL,                -- Foreign key referencing the photographer
      img_url VARCHAR(255) NOT NULL,               -- URL of the image
      is_deleted BOOLEAN DEFAULT false,             -- Soft delete flag
      created_at TIMESTAMP DEFAULT NOW(),           -- Record creation time
      updated_at TIMESTAMP DEFAULT NOW(),           -- Record last update time
      FOREIGN KEY (photographer_id) REFERENCES users(user_id) ON DELETE CASCADE  -- Ensure referential integrity
    );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('Photographer images table created or already exists');
  } catch (error) {
    console.error('Error creating photographer images table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createPhotographerImagesTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
