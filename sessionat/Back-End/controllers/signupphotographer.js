const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Your secret key for signing JWTs
const JWT_SECRET = process.env.JWT_SECRET;

const photographerSignup = async (req, res) => {
  const {
    full_name,
    email,
    password,
    city,
    phone_number,
    portfolio_link,
    years_of_experience,
    camera_and_equipment,
    description
  } = req.body;

  // Validate the input
  if (!full_name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert photographer into the database
    const query = `
      INSERT INTO users 
      (full_name, email, password, city, phone_number, portfolio_link, years_of_experience, camera_and_equipment, description, role, is_deleted)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;
    `;
    const values = [
      full_name,
      email,
      hashedPassword,
      city,
      phone_number,
      portfolio_link,
      years_of_experience,
      camera_and_equipment,
      description,
      "photographer", // role
      true,           // deleted
    ];
    
    const { rows } = await pool.query(query, values);

    const newPhotographer = {
      photographer_id: rows[0].photographer_id,
      full_name: rows[0].full_name,
      email: rows[0].email,
      city: rows[0].city,
      phone_number: rows[0].phone_number,
      portfolio_link: rows[0].portfolio_link,
      years_of_experience: rows[0].years_of_experience,
      camera_and_equipment: rows[0].camera_and_equipment,
      description: rows[0].description,
      created_at: rows[0].created_at,
    };

    // Generate JWT token
    const token = jwt.sign(
      { photographer_id: newPhotographer.photographer_id, email: newPhotographer.email },
      JWT_SECRET
    );

    // Set token in cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      path: '/'
    });

    res.status(201).json({ ...newPhotographer, role: 'photographer' });

  } catch (error) {
    console.error("Signup Error:", error);  // Log the error for debugging
    if (error.code === '23505') { // Unique violation error

      
      return res.status(409).json({ error: 'Email already exists.' });
    }
    return res.status(500).json({ error: 'Error signing up photographer.' });
  }
};

module.exports = { photographerSignup };
