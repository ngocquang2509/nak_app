const { createPool } = require('mysql');

const db = createPool({
  host: process.env.DB_HOST ,
  port: process.env.DB_PORT,
  user: process.env.DB_USER ,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  //port: process.env.PORT || 4000
  connectionLimit: 10
});

module.exports = db;