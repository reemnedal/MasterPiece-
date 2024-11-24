// Import the database pool from config
const pool = require('../config/db');


const getFavorites = async (req, res) => {
    const { user_id } = req.user;  // From auth middleware
  
    try {
      const getFavoritesQuery = `
        SELECT photographer_id 
        FROM favorites 
        WHERE user_id = $1 AND is_deleted = false;
      `;
      
      const { rows } = await pool.query(getFavoritesQuery, [user_id]);
      
      // Map to array of photographer_ids
      const favoriteIds = rows.map(row => row.photographer_id);
      
      res.status(200).json(favoriteIds);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).json({ error: 'Error fetching favorites' });
    }
  };
// Add photographer to favorites
const addFavorite = async (req, res) => {
  const { user_id } = req.user;  // Assuming the user_id is available in the request from authentication middleware
  const { phoId } = req.params;  // Photographer ID from the route parameters

  try {
    // Check if the photographer is already marked as a favorite by the user
    const checkFavoriteQuery = `
      SELECT * FROM favorites
      WHERE user_id = $1 AND photographer_id = $2 AND is_deleted = false;
    `;
    const { rows } = await pool.query(checkFavoriteQuery, [user_id, phoId]);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'This photographer is already in your favorites' });
    }

    // Add the photographer to the favorites table
    const addFavoriteQuery = `
      INSERT INTO favorites (user_id, photographer_id)
      VALUES ($1, $2)
      RETURNING favorite_id, user_id, photographer_id, created_at;
    `;
    const result = await pool.query(addFavoriteQuery, [user_id, phoId]);

    res.status(201).json({
      message: 'Photographer added to favorites successfully',
      favorite: result.rows[0],
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: 'Error adding favorite' });
  }
};

// Remove photographer from favorites
const removeFavorite = async (req, res) => {
  const { user_id } = req.user;  // Assuming the user_id is available in the request from authentication middleware
  const { phoId } = req.params;  // Photographer ID from the route parameters

  try {
    // Check if the photographer is in the user's favorites
    const checkFavoriteQuery = `
      SELECT * FROM favorites
      WHERE user_id = $1 AND photographer_id = $2 AND is_deleted = false;
    `;
    const { rows } = await pool.query(checkFavoriteQuery, [user_id, phoId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Photographer is not in your favorites' });
    }

    // Mark the favorite as deleted (soft delete)
    const removeFavoriteQuery = `
      UPDATE favorites
      SET is_deleted = true, updated_at = NOW()
      WHERE user_id = $1 AND photographer_id = $2
      RETURNING favorite_id, user_id, photographer_id, is_deleted, updated_at;
    `;
    const result = await pool.query(removeFavoriteQuery, [user_id, phoId]);

    res.status(200).json({
      message: 'Photographer removed from favorites successfully',
      favorite: result.rows[0],
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Error removing favorite' });
  }
};

module.exports = { addFavorite, removeFavorite,getFavorites };
