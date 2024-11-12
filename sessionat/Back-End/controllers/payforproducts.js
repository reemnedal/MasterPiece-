const pool = require('../config/db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Helper function to get user details
const getUserDetails = async (client, userId) => {
  const userResult = await client.query(
    'SELECT email, full_name FROM users WHERE user_id = $1',
    [userId]
  );
  return userResult.rows[0];
};

// Helper function to format order details for email
const formatOrderDetails = (cartItems, totalAmount) => {
  const itemsList = cartItems.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.product_name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.price} JD</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${(item.price * item.quantity).toFixed(2)} JD</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #704e81;">Order Confirmation</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 10px; text-align: left;">Product</th>
            <th style="padding: 10px; text-align: left;">Quantity</th>
            <th style="padding: 10px; text-align: left;">Price</th>
            <th style="padding: 10px; text-align: left;">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsList}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
            <td style="padding: 10px; font-weight: bold;">${totalAmount} JD</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
};

// Helper function to send confirmation email
const sendOrderConfirmation = async (userEmail, userName, orderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Order Confirmation - Thank you for your purchase!',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #704e81;">Thank you for your order, ${userName}!</h1>
        <p>We're pleased to confirm your order. Here are your order details:</p>
        ${orderDetails}
        <div style="margin-top: 20px; padding: 20px; background-color: #f8f9fa;">
          <p>If you have any questions about your order, please contact our customer service team.</p>
          <p>Thank you for shopping with us!</p>
        </div>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};

// Main function to create payment
const createPayment = async (req, res) => {
  const userId = req.user.user_id;
  const { cartItems, totalAmount } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Get user details for email
    const userDetails = await getUserDetails(client, userId);

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: { userId }
    });

    // Process cart items
    for (const item of cartItems) {
      if (!item.product_id) {
        throw new Error(`Missing product_id for cart item: ${JSON.stringify(item)}`);
      }

      // Insert into productpayments
      await client.query(
        `INSERT INTO productpayments (user_id, product_id, total_amount, payment_method, payment_status)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING payment_id`,
        [userId, item.product_id, item.price * item.quantity, 'stripe', 'completed']
      );
      
      // Update product stock
      const stockResult = await client.query(
        `UPDATE products 
         SET stock = stock - $1 
         WHERE product_id = $2 AND stock >= $1
         RETURNING stock`,
        [item.quantity, item.product_id]
      );

      if (stockResult.rowCount === 0) {
        throw new Error(`Insufficient stock for product_id: ${item.product_id}`);
      }
    }

    // Clear cart items
    await client.query('DELETE FROM carts WHERE user_id = $1', [userId]);

    // Format and send email
    const orderDetailsHtml = formatOrderDetails(cartItems, totalAmount);
    await sendOrderConfirmation(userDetails.email, userDetails.full_name, orderDetailsHtml);

    await client.query('COMMIT');

    // Only send the client_secret
    res.json(paymentIntent.client_secret);

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Payment error details:', error);
    res.status(500).json({ error: 'Payment processing failed', details: error.message });
  } finally {
    client.release();
  }
};

module.exports = { createPayment };
