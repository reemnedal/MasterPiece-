// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const pool = require('../config/db');

// const processPayment = async (req, res) => {
//   const { paymentMethodId, amount, sessionId, photographerId, returnUrl } = req.body;
//   const userId = req.user.user_id; // Assuming you have user authentication middleware

//   try {
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//       payment_method: paymentMethodId,
//       confirm: true,
//       return_url: 'http://localhost:5000' , 
//     });

//     // Calculate platform and photographer profits (adjust as needed)
//     const platformProfit = amount * 0.1; // 10% platform fee
//     const photographerProfit = amount - platformProfit;

//     // Insert payment record into the database
//     const query = `
//       INSERT INTO payments (user_id, photographer_id, session_id, total_amount, platform_profit, photographer_profit)
//       VALUES ($1, $2, $3, $4, $5, $6)
//       RETURNING payment_id;
//     `;
//     const values = [
//       userId,
//       photographerId,
//       sessionId,
//       amount / 100,
//       platformProfit / 100,
//       photographerProfit / 100,
//     ];
//     const { rows } = await pool.query(query, values);

//     // Update the status in the booked_sessions table
//     const updateBookedSessionQuery = `
//       UPDATE booked_sessions
//       SET status = 'booked', updated_at = NOW()
//       WHERE session_id = $1 AND user_id = $2
//       RETURNING booked_session_id;
//     `;
//     const bookedSessionValues = [sessionId, userId];
//     await pool.query(updateBookedSessionQuery, bookedSessionValues);

//     // Update the status in the available_sessions table
//     const updateAvailableSessionQuery = `
//       UPDATE available_sessions
//       SET status = 'booked', updated_at = NOW()
//       WHERE session_id = $1
//       RETURNING session_id;
//     `;
//     await pool.query(updateAvailableSessionQuery, [sessionId]);

//     res.json({ success: true, paymentId: rows[0].payment_id });
//   } catch (error) {
//     console.error('Error processing payment:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// module.exports = { processPayment };




const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const pool = require('../config/db');
const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const processPayment = async (req, res) => {
  const { paymentMethodId, amount, sessionId, photographerId } = req.body;
  // Assuming you have user authentication middleware
  const userId = req.user.user_id; 
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
       return_url: 'http://localhost:5000'
    });

    // Calculate platform and photographer profits
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

    // Update booked_sessions and available_sessions status
    const updateBookedSessionQuery = `
      UPDATE booked_sessions
      SET status = 'booked', updated_at = NOW()
      WHERE session_id = $1 AND user_id = $2
      RETURNING booked_session_id;
    `;
    await pool.query(updateBookedSessionQuery, [sessionId, userId]);

    const updateAvailableSessionQuery = `
      UPDATE available_sessions
      SET status = 'booked', updated_at = NOW()
      WHERE session_id = $1
      RETURNING session_id;
    `;
    await pool.query(updateAvailableSessionQuery, [sessionId]);

    // Fetch user and session details
    const userDetails = await pool.query(
      'SELECT email, full_name FROM users WHERE user_id = $1',
      [userId]
    );
    const sessionDetails = await pool.query(
      'SELECT * FROM available_sessions WHERE session_id = $1',
      [sessionId]
    );
    const photographerDetails = await pool.query(
      'SELECT * FROM users WHERE user_id = $1',
      [photographerId]
    );

    const user = userDetails.rows[0];
    const session = sessionDetails.rows[0];
    const photographer = photographerDetails.rows[0];

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Booking Confirmation',
      html: `
        <h2 style="font-family: Arial, sans-serif; color:#704e81;">Booking Confirmation</h2>
        <p>Dear ${user.full_name},</p>
        <p>Thank you for booking with us. Here are your session details:</p>
        <ul>
          <li><strong style="color:#704e81;">Photographer:</strong> ${photographer.full_name}</li>
          <li><strong  style="color:#704e81;">Date:</strong> ${new Date(session.session_date).toLocaleDateString()}</li>
          <li><strong  style="color:#704e81;">Time:</strong> ${session.time_from} - ${session.time_to}</li>
          <li><strong  style="color:#704e81;">Location:</strong> ${session.session_place || 'Not specified'}</li>
          <li><strong  style="color:#704e81;">E-mail:</strong> ${photographer.email }</li>
          <li><strong  style="color:#704e81;">Mobile:</strong> ${photographer.phone_number }</li>
          <li><strong  style="color:#704e81;">Price:</strong> $${(amount / 100).toFixed(2)}</li>
        </ul>
        <p>We look forward to providing you with an amazing experience!</p>
        <p>Best regards,</p>
        <p>Your Photography Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, paymentId: rows[0].payment_id });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { processPayment };
