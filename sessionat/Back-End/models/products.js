// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'products' table
const createProductsTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS products (
        product_id SERIAL PRIMARY KEY,          -- Unique identifier for the product
        product_name VARCHAR(255) NOT NULL,     -- Name of the product
        price DECIMAL(10, 2) NOT NULL,          -- Price of the product, with up to two decimal places
        stock INT NOT NULL DEFAULT 0,           -- Stock count for the product
        category VARCHAR(100),                  -- Category of the product
        description TEXT,                       -- Description of the product
        image_url VARCHAR(255),                 -- URL for the product image
        created_at TIMESTAMP DEFAULT NOW(),     -- Record creation time
        updated_at TIMESTAMP DEFAULT NOW()      -- Record last update time
      );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('Products table created or already exists');
  } catch (error) {
    console.error('Error creating products table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createProductsTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
