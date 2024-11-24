const pool = require('../config/db');

const insertFakeCoursesData = async () => {
    const query = `
      INSERT INTO courses 
      (photographer_id, course_name, content, duration, start_date, end_date, is_online, is_deleted)
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const fakeCoursesData = [
        // Example data for courses
        [11, 'Photography 101', 'Introduction to photography, covering basics of camera settings, lighting, and composition.', 10, '2024-12-01 09:00:00', '2024-12-01 19:00:00', false, false],
        [11, 'Advanced Portrait Photography', 'Learn advanced techniques for portrait photography, including studio lighting and posing techniques.', 12, '2024-12-05 10:00:00', '2024-12-06 18:00:00', true, false],
        [11, 'Landscape Photography Masterclass', 'Master the art of landscape photography, including techniques for shooting wide-angle and long exposure shots.', 8, '2024-12-10 08:00:00', '2024-12-10 16:00:00', false, false],
        [11, 'Photo Editing with Photoshop', 'In-depth course on photo editing, focusing on retouching, color correction, and creating stunning compositions using Photoshop.', 6, '2024-12-15 14:00:00', '2024-12-15 20:00:00', true, false],
        [11, 'Wedding Photography Essentials', 'Cover the essentials of wedding photography, from pre-shoot planning to capturing key moments during the ceremony and reception.', 14, '2024-12-20 09:00:00', '2024-12-21 17:00:00', false, false],
    ];

    try {
        for (const data of fakeCoursesData) {
            const res = await pool.query(query, data);
            console.log('Inserted course:', res.rows[0]);
        }
    } catch (error) {
        console.error('Error inserting fake course data:', error);
    }
};

// Run the function to insert fake course data
insertFakeCoursesData();
