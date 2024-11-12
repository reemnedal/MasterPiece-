// Import the database pool from config
const pool = require('../config/db');

// Define the function to create the 'payments' table
const createPaymentsTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS payments (
      payment_id SERIAL PRIMARY KEY,            -- Unique identifier for each payment
      user_id INT NOT NULL,                     -- ID of the user making the payment
      photographer_id INT NOT NULL,             -- ID of the photographer receiving the payment
      session_id INT NOT NULL,                  -- ID of the session associated with the payment
      total_amount DECIMAL(10, 2) NOT NULL,    -- Total amount of the payment
      platform_profit DECIMAL(10, 2) NOT NULL, -- Profit retained by the platform
      photographer_profit DECIMAL(10, 2) NOT NULL, -- Profit to the photographer
      payment_date TIMESTAMP DEFAULT NOW(),     -- Date and time of the payment
      FOREIGN KEY (user_id) REFERENCES users(user_id), -- Foreign key constraint referencing users table
      FOREIGN KEY (photographer_id) REFERENCES users(user_id), -- Foreign key constraint referencing photographers table
      FOREIGN KEY (session_id) REFERENCES available_sessions(session_id) -- Foreign key constraint referencing available_sessions table
    );
  `;

  try {
    // Execute the query to create the table
    await pool.query(query);
    console.log('Payments table created or already exists');
  } catch (error) {
    console.error('Error creating payments table:', error);
  }
};

// Initialize the table creation process
const init = async () => {
  await createPaymentsTable();
  process.exit(); // Exit the process once the table is created
};

// Run the initialization
init();
