
// import express from 'express';
// import cors from "cors";
// import pool from './db.js'; // Import the database connection
// const app = express();
// app.use(cors()); 

// // Middleware to parse JSON request bodies
// app.use(express.json());


// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the Book Store API!');
// });
// // Route to create a new book
// app.post("/books", async (req, res) => {
//   try{
//     const{title, author, price, short_description,cover_image} = req.body;
//     // validate the input
//     if(!title || !author || !price || !short_description || !cover_image){
//       return res.status(400).json({error:"Failed to create book"});
//     }
//     // insert the new book into the database
//     const [result] = await pool.query(
//       'INSERT INTO books (title, author, price, short_description, cover_image) VALUES (?, ?, ?, ?, ?)',
//       [title, author, price, short_description, cover_image]
//     );
//     res.status(201).json({message: "Book created successfully", bookId: result.insertId, title, author, price, short_description, cover_image});

//   }
//  catch(err){
//   console.error(err);
//   res.status(500).json({error: "Failed to create book"});
// }
// });



// // Route to get all books
// app.get("/books",  async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM books");
//     res.status(200).json(rows);
//   } catch (err) {
//     console.error("Error fetching books:", err);
//     res.status(500).json({ error: "Failed to get books" });
//   }
  
// // Route to get a single book by ID
// app.get("/books/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Book not found" });
//     }
// // Return the first (and only) book
//     res.status(200).json(rows[0]); 
//   } catch (err) {
//     console.error("Error fetching book:", err);
//     res.status(500).json({ error: "Failed to get book" });
//   }
// });




//   // Route to update a book (PUT)
// app.put("/books/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, author, price, short_description, cover_image } = req.body;

//   // Validate input
//   if (!title || !author || !price || !short_description || !cover_image) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const [result] = await pool.query(
//       "UPDATE books SET title = ?, author = ?, price = ?, short_description = ?, cover_image = ? WHERE id = ?",
//       [title, author, price, short_description, cover_image, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Book not found" });
//     }

//     res.status(200).json({ message: "Book updated successfully", id, title, author, price, short_description, cover_image }); 
//   } catch (err) {
//     console.error("Error updating book:", err);
//     res.status(500).json({ error: "Failed to update book" });
//   }
// });

// // Route to delete a book (DELETE)
// app.delete("/books/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [result] = await pool.query("DELETE FROM books WHERE id = ?", [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Book not found" });
//     }

//     res.status(200).json({ message: "Book deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting book:", err);
//     res.status(500).json({ error: "Failed to delete book" });
//   }
// });

// });


// export default app;


// ========================================================================================================



import express from 'express';
import cors from "cors";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import pool from './db.js'; // Import the database connection

const app = express();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

export const requireAuth = ClerkExpressWithAuth({});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Store API!');
});

// Route to create a new book
app.post("/books", requireAuth, async (req, res) => {
  try {
    const { title, author, price, short_description, cover_image } = req.body;
    const user_id = req.auth.userId; // Get authenticated user's ID from Clerk

    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized: User must be logged in" });
    }

    if (!title || !author || !price || !short_description || !cover_image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO books (title, author, price, short_description, cover_image, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [title, author, price, short_description, cover_image, user_id]
    );

    res.status(201).json({ message: "Book created successfully", bookId: result.insertId });
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).json({ error: "Failed to create book" });
  }
});

// Route to get all books
app.get("/books", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to get books" });
  }
});

// Route to get a single book by ID
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    // Return the first (and only) book
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).json({ error: "Failed to get book" });
  }
});

// Route to update a book (PUT)
app.put("/books/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, author, price, short_description, cover_image } = req.body;
  const userId = req.auth.userId; // Get authenticated user ID
// Validate input
  if (!title || !author || !price || !short_description || !cover_image) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Find the book to check ownership
    const [rows] = await pool.query("SELECT user_id FROM books WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (rows[0].user_id !== userId) {
      return res.status(403).json({ error: "You are not authorized to update this book" });
    }

    // Update the book
    await pool.query(
      "UPDATE books SET title = ?, author = ?, price = ?, short_description = ?, cover_image = ? WHERE id = ?",
      [title, author, price, short_description, cover_image, id]
    );

    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Route to delete a book (DELETE)
app.delete("/books/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.auth.userId; // Get authenticated user ID

  try {
    // Find the book to check ownership
    const [rows] = await pool.query("SELECT user_id FROM books WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (rows[0].user_id !== userId) {
      return res.status(403).json({ error: "You are not authorized to delete this book" });
    }

    // Delete the book
    await pool.query("DELETE FROM books WHERE id = ?", [id]);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

export default app;