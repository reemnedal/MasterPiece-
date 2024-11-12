// Import the database pool from config
const pool = require('../config/db');

// Function to fetch products with stock greater than 0
const fetchAvailableProducts = async (req, res) => {
  try {
    const query = `
      SELECT * FROM products 
      WHERE stock > 0;
    `;

    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No products in stock' });
    }

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

module.exports = { fetchAvailableProducts };
