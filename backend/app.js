
import express from 'express';
import pool from './db.js'; // Import the database connection

const app = express();

// Test database connection
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.send(`Database connection successful. Result: ${rows[0].result}`);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Database connection failed.');
  }
});
// app.get('/books', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM books');
//     res.json(rows);
//   } catch (err) {
//     console.error('Error fetching books:', err);
//     res.status(500).send('Error fetching books.');
//   }
// });

export default app;