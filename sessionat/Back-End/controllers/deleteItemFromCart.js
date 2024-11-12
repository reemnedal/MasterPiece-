// Import the database pool from config
const pool = require("../config/db");

// Function to delete a specific item from the cart
const deleteCartItem = async (req, res) => {
  const userId = req.user.user_id; // Assuming user authentication is implemented
  const cartId = req.params.itemId; // Get the cart item ID from the request parameters

  try {
    // Query to delete the item from the cart
    const query = `
      DELETE FROM carts 
      WHERE cart_id = $1 AND user_id = $2
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [cartId, userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Cart item not found or unauthorized' });
    }

    res.json({ message: 'Item removed from cart', deletedItem: rows[0] });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Error deleting cart item' });
  }
};

module.exports = { deleteCartItem };
