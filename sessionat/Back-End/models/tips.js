// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'tips' table
const createTipsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS tips (
      tip_id SERIAL PRIMARY KEY,                         -- Unique identifier for the tip
      photographer_id INT REFERENCES users(user_id) ON DELETE CASCADE, -- Links to the photographer
      title VARCHAR(255) NOT NULL,                      -- Title of the tip
      description TEXT NOT NULL,                        -- Detailed description
      type VARCHAR(50),                                 -- Type of tip (e.g., video, text)
      link TEXT,                                        -- URL or video link
      category VARCHAR(100),                            -- Tip category
      is_deleted BOOLEAN DEFAULT false,                -- Soft delete flag
      created_at TIMESTAMP DEFAULT NOW(),               -- Record creation time
      updated_at TIMESTAMP DEFAULT NOW()                -- Record last update time
    );
  `;

  try {
    await pool.query(query);
    console.log('Tips table created or already exists');
  } catch (error) {
    console.error('Error creating tips table:', error);
  }
};

// Define the function to create the 'categories' table
const createCategoriesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS categories (
      category_id SERIAL PRIMARY KEY,                  -- Unique identifier for the category
      name VARCHAR(100) NOT NULL UNIQUE,              -- Category name
      created_at TIMESTAMP DEFAULT NOW()              -- Record creation time
    );
  `;

  try {
    await pool.query(query);
    console.log('Categories table created or already exists');
  } catch (error) {
    console.error('Error creating categories table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createTipsTable();
  await createCategoriesTable();
  process.exit(); // Exit the process once tables are created
};

// Run the initialization
init();
