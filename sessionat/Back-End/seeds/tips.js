// const pool = require('../config/db');

// // Function to insert seed data into the 'tips' table
// const insertTipsData = async () => {
//   const query = `
//     INSERT INTO tips 
//     (photographer_id, title, description, type, link, category, is_deleted)
//     VALUES 
//     ($1, $2, $3, $4, $5, $6, $7)
//     RETURNING *;
//   `;

//   const tipsData = [
//     // Example tips data
//     [11, 'Outdoor Photography Tips', 'Learn how to capture stunning outdoor shots with minimal equipment.', 'text', 'https://example.com/outdoor-tips', 'Guides', false],
//     [11, 'Portrait Photography Basics', 'Master the basics of portrait photography in this comprehensive guide.', 'text', 'https://example.com/portrait-basics', 'Portrait', false],
//     [11, 'Top 5 Photography Tricks', 'Discover the top 5 tricks every photographer should know.', 'video', 'https://example.com/tricks-video', 'Tutorials', false],
//     [11, 'Nature Photography Guide', 'A step-by-step guide to capturing beautiful nature photos.', 'text', 'https://example.com/nature-guide', 'Nature', false],
//     [11, 'Lighting Techniques for Photography', 'An advanced video tutorial on mastering lighting for perfect shots.', 'video', 'https://example.com/lighting-tutorial', 'Lighting', false]
//   ];

//   try {
//     for (const tip of tipsData) {
//       const res = await pool.query(query, tip);
//       console.log('Inserted Tip:', res.rows[0]);
//     }
//   } catch (error) {
//     console.error('Error inserting tips data:', error);
//   }
// };

// // Run the function to insert tips data
// insertTipsData();
const pool = require('../config/db');

// Function to insert seed data into the 'categories' table
const insertCategoriesData = async () => {
  const query = `
    INSERT INTO categories 
    (name)
    VALUES 
    ($1)
    RETURNING *;
  `;

  const categoriesData = [
    // Example categories
    ['Guides'],         // General guides for photographers
    ['Portrait'],       // Tips specific to portrait photography
    ['Nature'],         // Focused on nature and outdoor photography
    ['Lighting'],       // Lighting techniques and tutorials
    ['Tutorials'],      // General tutorials and tips
    ['Equipment'],      // Advice on camera and equipment usage
    ['Editing'],        // Tips on photo editing and post-processing
    ['Creative Ideas']  // Inspiration for creative photography projects
  ];

  try {
    for (const category of categoriesData) {
      const res = await pool.query(query, category);
      console.log('Inserted Category:', res.rows[0]);
    }
  } catch (error) {
    console.error('Error inserting categories data:', error);
  }
};

// Run the function to insert categories data
insertCategoriesData();
