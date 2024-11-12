// config.js
require('dotenv').config();

module.exports = {
  db: {
    host: process.env.DB_HOST  ,
    user: process.env.DB_USER  ,
    password: process.env.DB_PASSWORD  ,
    database: process.env.DB_NAME  ,
    // max: process.env.DB_MAX || 10 // Maximum number of clients in the pool
  }
};
