
import express from 'express';
import cors from "cors";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { checkBookOwnership } from './helperFunctions/checkBookOwnership.js'; // Import the helper function for ownership check
// Import the database connection
import pool from './db.js'; 

const app = express();
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

export const requireAuth = ClerkExpressWithAuth({});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Store API!');
});

// Route to get all books (sorted by newest first)
app.get("/books", async (req, res) => {
  try {
    const { sort = 'newest' } = req.query;
    // Default: newest first
    let orderBy;
    // Using switch statement for sorting logic
    switch (sort) {
      case "price-low":
        orderBy = "price ASC";
        break;
      case "price-high":
        orderBy = "price DESC";
        break;
      default:
        // Default: Newest first
        orderBy = "created_at DESC"; 
    }

   // Executes a SQL query using a connection pool from the pool
    const [rows] = await pool.query(
      // Applies the sorting logic dynamically.
      `SELECT * FROM books ORDER BY ${orderBy}`
    );
    // Sends the retrieved books as JSON.
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to get books" });
  }
});

// Route to create a new book (updated to include timestamp, with optional fields)
app.post("/book", requireAuth, async (req, res) => {
  try {
    const { title, author, price, short_description, cover_image } = req.body;
    const user_id = req.auth.userId;
    const created_at = new Date();

    // Required fields validation
    if (!user_id) {
      return res.status(401).json({ error: "Unauthorized: User must be logged in" });
    }

    if (!title || !author || !price) {  
      // Removed short_description and cover_image from required check
      return res.status(400).json({ error: "Title, author, and price are required" });
    }

    // Set default values for optional fields
    const description = short_description ? short_description : null;
    // Default image path
    const image = cover_image ? cover_image : null;
    const [result] = await pool.query(
      "INSERT INTO books (title, author, price, short_description, cover_image, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, author, price, description, image, user_id, created_at]
    );

    res.status(201).json({ 
      message: "Book created successfully", 
      bookId: result.insertId,
      // includ property name
      createdAt: created_at
    });
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(500).json({ error: "Failed to create book" });
  }
});


// Route to get ONLY the logged-in user's books
app.get("/my-books", requireAuth, async (req, res) => {
  try {
    // From Clerk middleware, we have access to req.auth.userId
    const userId = req.auth.userId; 
    const [rows] = await pool.query(
      //   Sorting added here
      "SELECT * FROM books WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    // Returning sorted books
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching user's books:", err);
    res.status(500).json({ error: "Failed to get your books" });
  }
});

// Route to get a single book by ID
app.get("/book/:id", async (req, res) => {
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
app.put("/book/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, author, price, short_description, cover_image } = req.body;
  const userId = req.auth.userId;

  if (!title || !author || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Use helper function to check ownership
    const ownershipCheck = await checkBookOwnership(id, userId, pool);

    if (ownershipCheck.error) {
      return res.status(ownershipCheck.status).json({ error: ownershipCheck.error });
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


// Route to update a book (PUT)
// app.put("/book/:id", requireAuth, async (req, res) => {
//   const { id } = req.params;
//   const { title, author, price, short_description, cover_image } = req.body;
//   const userId = req.auth.userId; // Get authenticated user ID
// // Validate input
//   if (!title || !author || !price) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     // Find the book to check ownership
//     // create a helper function for this
//     const [rows] = await pool.query("SELECT user_id FROM books WHERE id = ?", [id]);

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Book not found" });
//     }

//     if (rows[0].user_id !== userId) {
//       return res.status(403).json({ error: "You are not authorized to update this book" });
//     }

//     // Update the book
//     await pool.query(
//       "UPDATE books SET title = ?, author = ?, price = ?, short_description = ?, cover_image = ? WHERE id = ?",
//       [title, author, price, short_description, cover_image, id]
//     );

//     res.status(200).json({ message: "Book updated successfully" });
//   } catch (err) {
//     console.error("Error updating book:", err);
//     res.status(500).json({ error: "Failed to update book" });
//   }
// });

// Route to delete a book (DELETE)
app.delete("/books/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.auth.userId;

  try {
    // Use helper function to check ownership
    const ownershipCheck = await checkBookOwnership(id, userId, pool);

    if (ownershipCheck.error) {
      return res.status(ownershipCheck.status).json({ error: ownershipCheck.error });
    }

    // Delete the book
    await pool.query("DELETE FROM books WHERE id = ?", [id]);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// app.delete("/books/:id", requireAuth, async (req, res) => {
//   const { id } = req.params;
//   // Get authenticated user ID
//   const userId = req.auth.userId; 

//   try {
//     // Find the book to check ownership
//     const [rows] = await pool.query("SELECT user_id FROM books WHERE id = ?", [id]);

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Book not found" });
//     }

//     if (rows[0].user_id !== userId) {
//       return res.status(403).json({ error: "You are not authorized to delete this book" });
//     }

//     // Delete the book
//     await pool.query("DELETE FROM books WHERE id = ?", [id]);
//     res.status(200).json({ message: "Book deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting book:", err);
//     res.status(500).json({ error: "Failed to delete book" });
//   }
// });

export default app;