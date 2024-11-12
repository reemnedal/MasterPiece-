const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND is_deleted = false', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET, // Use a strong secret stored in environment variables
    
    );

    console.log('User ID in login:', user.user_id);
    // Set cookie options
    const cookieOptions = {
      httpOnly: true, // Cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'lax', // Cookie won't be sent on cross-origin requests
      expires: new Date(Date.now() + 3600000), // 1 hour
      path: '/' // Cookie accessible across the entire site
    };

    // Set cookie in response
    res.cookie('token', token);
    // Return user data (optional, depending on your needs)


       // Set a separate cookie for the user role
       const roleCookieOptions = {
        httpOnly: false, // You can set this to true if you don't need to access it via JavaScript
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'lax', // Cookie won't be sent on cross-origin requests
        expires: new Date(Date.now() + 3600000), // 1 hour
        path: '/' // Cookie accessible across the entire site
      };
  
      res.cookie('role', user.role, roleCookieOptions);
    res.status(200).json({
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        phone_number: user.phone_number,
        city: user.city,
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser };
