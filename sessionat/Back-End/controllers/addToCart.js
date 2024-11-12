// Import the database pool from config
const pool = require("../config/db");

// Function to add an item to the cart
const addToCart = async (req, res) => {
  const {  product_id, quantity } = req.body;
  const user_id = req.user.user_id;
  try {
    // Check if the product already exists in the user's cart
    const checkQuery = `
      SELECT * FROM carts WHERE user_id = $1 AND product_id = $2;
    `;
    const checkResult = await pool.query(checkQuery, [user_id, product_id]);

    if (checkResult.rows.length > 0) {
      // If product exists, update the quantity
      const updateQuery = `
        UPDATE carts
        SET quantity = $1
        WHERE user_id = $2 AND product_id = $3;
      `;
      await pool.query(updateQuery, [quantity, user_id, product_id]);
    } else {
      // If product does not exist, insert a new record
      const insertQuery = `
        INSERT INTO carts (user_id, product_id, quantity)
        VALUES ($1, $2, $3);
      `;
      await pool.query(insertQuery, [user_id, product_id, quantity]);
    }

    res.status(200).json({ success: true, message: "Product added to cart." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error adding to cart." });
  }
};

module.exports = { addToCart };
