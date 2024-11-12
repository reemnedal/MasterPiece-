const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const pool = require('../config/db');

const processPayment = async (req, res) => {
  const { paymentMethodId, amount, sessionId, photographerId, returnUrl } = req.body;
  const userId = req.user.user_id; // Assuming you have user authentication middleware

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      return_url: 'http://localhost:5000' , 
    });

    // Calculate platform and photographer profits (adjust as needed)
    const platformProfit = amount * 0.1; // 10% platform fee
    const photographerProfit = amount - platformProfit;

    // Insert payment record into the database
    const query = `
      INSERT INTO payments (user_id, photographer_id, session_id, total_amount, platform_profit, photographer_profit)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING payment_id;
    `;
    const values = [
      userId,
      photographerId,
      sessionId,
      amount / 100,
      platformProfit / 100,
      photographerProfit / 100,
    ];
    const { rows } = await pool.query(query, values);

    // Update the status in the booked_sessions table
    const updateBookedSessionQuery = `
      UPDATE booked_sessions
      SET status = 'booked', updated_at = NOW()
      WHERE session_id = $1 AND user_id = $2
      RETURNING booked_session_id;
    `;
    const bookedSessionValues = [sessionId, userId];
    await pool.query(updateBookedSessionQuery, bookedSessionValues);

    // Update the status in the available_sessions table
    const updateAvailableSessionQuery = `
      UPDATE available_sessions
      SET status = 'booked', updated_at = NOW()
      WHERE session_id = $1
      RETURNING session_id;
    `;
    await pool.query(updateAvailableSessionQuery, [sessionId]);

    res.json({ success: true, paymentId: rows[0].payment_id });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { processPayment };
