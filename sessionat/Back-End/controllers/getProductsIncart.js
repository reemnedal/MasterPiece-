// Import the database pool from config
const pool = require("../config/db");

// Function to fetch all products in the cart for a specific user
const fetchCartItems = async (req, res) => {
  const userId = req.user.user_id; // Assuming user authentication is implemented

  try {
    // Query to fetch cart items with product details
    const query = `
      SELECT c.cart_id, c.quantity, p.product_name,p.product_id, p.price, p.stock, p.category, p.description, p.image_url 
      FROM carts c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.user_id = $1;
    `;
    const { rows } = await pool.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No items in cart' });
    }

    res.json({ cartItems: rows });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Error fetching cart items' });
  }
};

module.exports = { fetchCartItems };
