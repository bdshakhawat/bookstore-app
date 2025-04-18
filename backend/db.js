
import mysql from 'mysql2/promise'; // Use the promise-based API
import 'dotenv/config';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Create a connection pool
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10000,
  queueLimit: 0,
});

export default pool;