
import express from 'express';
import cors from "cors";
import { requireAuth } from "./middleware/clerkAuth.js";
import pool from './db.js'; // Import the database connection
const app = express();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to create a new book
app.post("/books", async (req, res) => {
  try{
    const{title, author, price} = req.body;
    // validate the input
    if(!title || !author || !price){
      return res.status(400).json({error:"Failed to create book"});
    }
    // insert the new book into the database
    const [result] = await pool.query(
      'INSERT INTO books (title, author, price) VALUES (?, ?, ?)',
      [title, author, price]
    );
    res.status(201).json({message: "Book created successfully", bookId: result.insertId, title, author, price});

  }
 catch(err){
  console.error(err);
  res.status(500).json({error: "Failed to create book"});
}
});

app.use(cors()); // Enable CORS for all routes


// Route to get all books
app.get("/books", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to get books" });
  }
});
// app.get("/books", async (req, res) => {
//   try{
//     const [rows] = await pool.query('SELECT * FROM books');
//     res.status(200).json(rows);
//   }
//   catch(err){
//     console.error("Error Fetching book: ",  err);
//     res.status(500).json({error: "Failed to get books"});
//   }
// });


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

export default app;
// import express from 'express';
// import cors from "cors";
// // import { requireAuth } from "./middleware/clerkAuth.js";
// import pool from './db.js'; // Import the database connection
// const app = express();
// app.use(cors());

// // Middleware to parse JSON request bodies
// app.use(express.json());

// // Route to create a new book
// app.post("/books", async (req, res) => {
//   try{
//     const{title, author, price} = req.body;
//     // validate the input
//     if(!title || !author || !price){
//       return res.status(400).json({error:"Failed to create book"});
//     }
//     // insert the new book into the database
//     const [result] = await pool.query(
//       'INSERT INTO books (title, author, price) VALUES (?, ?, ?)',
//       [title, author, price]
//     );
//     res.status(201).json({message: "Book created successfully", bookId: result.insertId, title, author, price});

//   }
//  catch(err){
//   console.error(err);
//   res.status(500).json({error: "Failed to create book"});
// }
// });

// app.use(cors()); // Enable CORS for all routes


// // Route to get all books
// app.get("/books",  async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM books");
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error("Error fetching books:", err);
//     res.status(500).json({ error: "Failed to get books" });
//   }
// });
// // app.get("/books", async (req, res) => {
// //   try{
// //     const [rows] = await pool.query('SELECT * FROM books');
// //     res.status(200).json(rows);
// //   }
// //   catch(err){
// //     console.error("Error Fetching book: ",  err);
// //     res.status(500).json({error: "Failed to get books"});
// //   }
// // });


// // Test database connection
// app.get('/', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT 1 + 1 AS result');
//     res.send(`Database connection successful. Result: ${rows[0].result}`);
//   } catch (err) {
//     console.error('Database connection error:', err);
//     res.status(500).send('Database connection failed.');
//   }
// });

// export default app;