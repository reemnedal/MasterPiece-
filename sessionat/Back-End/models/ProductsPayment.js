// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'productpayments' table
const createProductPaymentsTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS productpayments (
        payment_id SERIAL PRIMARY KEY,                -- Unique identifier for the payment
        user_id INT NOT NULL,                         -- The user who made the payment (foreign key to users table)
        product_id INT NOT NULL,                      -- The product associated with the payment (foreign key to products table)
        total_amount DECIMAL(10, 2) NOT NULL,         -- Total amount paid
        payment_method VARCHAR(50) NOT NULL,           -- Payment method (e.g., 'Credit Card', 'PayPal')
        payment_status VARCHAR(50) DEFAULT 'Pending',  -- Payment status (e.g., 'Pending', 'Completed', 'Failed')
        payment_date TIMESTAMP DEFAULT NOW(),          -- Date and time of payment
        created_at TIMESTAMP DEFAULT NOW(),            -- Record creation time
        updated_at TIMESTAMP DEFAULT NOW(),            -- Record last update time
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,  -- Link to the users table
        FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE  -- Link to the products table
      );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('Productpayments table created or already exists');
  } catch (error) {
    console.error('Error creating productpayments table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createProductPaymentsTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
