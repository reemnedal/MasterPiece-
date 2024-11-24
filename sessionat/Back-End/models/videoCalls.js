const pool = require('../config/db');

const createVideoCallsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS video_calls (
      call_id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(user_id),
      call_start TIMESTAMP DEFAULT NOW(),
      call_end TIMESTAMP,
      duration INT,
      status VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(query);
    console.log('Video calls table created or already exists');
  } catch (error) {
    console.error('Error creating video calls table:', error);
  }
};

const init = async () => {
  await createVideoCallsTable();
  process.exit();
};

init();
