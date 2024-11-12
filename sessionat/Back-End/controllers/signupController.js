 const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Your secret key for signing JWTs
const JWT_SECRET = process.env.JWT_SECRET ;

const signup = async (req, res) => {
  const { full_name, email, password, city, phone_number } = req.body;

  // Validate the input
  if (!full_name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query = `
      INSERT INTO users (full_name, email, password, city, phone_number, role)
      VALUES ($1, $2, $3, $4, $5, 'user') RETURNING *; 
    `;
    const values = [full_name, email, hashedPassword, city, phone_number];

    const { rows } = await pool.query(query, values);

    const newUser = {
      user_id: rows[0].user_id,
      full_name: rows[0].full_name,
      email: rows[0].email,
      city: rows[0].city,
      phone_number: rows[0].phone_number,
      created_at: rows[0].created_at,
    };

    // Generate JWT token
    const token = jwt.sign(
      { user_id: newUser.user_id, email: newUser.email },
      JWT_SECRET 
    );
 
    
  
    
    
    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    });
    
    
    
 

   
   res.status(201).json({ ...newUser, role: 'user' }); // Modify this line if necessary


  } catch (error) {
    // console.error('Error signing up user:', error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Error signing up user.' });
  }
};

module.exports = { signup };
