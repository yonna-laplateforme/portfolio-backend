import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

// C'est cette ligne qui résout le problème : 
// Elle force mysql2 à utiliser les promesses partout.
const promisePool = pool.promise();

export default promisePool;