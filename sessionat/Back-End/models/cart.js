// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'carts' table
const createCartsTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS carts (
        cart_id SERIAL PRIMARY KEY,               -- Unique identifier for the cart item
        user_id INT NOT NULL,                     -- The user associated with the cart (foreign key to users table)
        product_id INT NOT NULL,                  -- The product added to the cart (foreign key to products table)
        quantity INT NOT NULL DEFAULT 1,          -- The quantity of the product in the cart
        created_at TIMESTAMP DEFAULT NOW(),       -- Time when the item was added to the cart
        updated_at TIMESTAMP DEFAULT NOW(),       -- Time when the cart was last updated
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,  -- Link to the users table
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE  -- Link to the products table
      );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('Carts table created or already exists');
  } catch (error) {
    console.error('Error creating carts table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createCartsTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
