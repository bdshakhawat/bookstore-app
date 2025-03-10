
import express from 'express';
import cors from "cors";
import pool from './db.js'; // Import the database connection
const app = express();
app.use(cors()); 

// Middleware to parse JSON request bodies
app.use(express.json());


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Store API!');
});
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



// Route to get all books
app.get("/books",  async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to get books" });
  }
  

  // Route to update a book (PUT)
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  // Validate input
  if (!title || !author || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?",
      [title, author, price, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", id, title, author, price });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Route to delete a book (DELETE)
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM books WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

});


export default app;
