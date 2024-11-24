// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'favorites' table
const createFavoritesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS favorites (
      favorite_id SERIAL PRIMARY KEY,             -- Unique identifier for each favorite entry
      user_id INT REFERENCES users(user_id) ON DELETE CASCADE,  -- User who marked the photographer as a favorite
      photographer_id INT REFERENCES users(user_id) ON DELETE CASCADE, -- Photographer who is marked as a favorite
      is_deleted BOOLEAN DEFAULT false,            -- Flag to indicate if the favorite is deleted (soft delete)
      created_at TIMESTAMP DEFAULT NOW(),          -- Timestamp when the favorite was created
      updated_at TIMESTAMP DEFAULT NOW()       -- Timestamp when the favorite was last updated
     );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('Favorites table created or already exists');
  } catch (error) {
    console.error('Error creating favorites table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createFavoritesTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
