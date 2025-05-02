import * as bookService from './bookServices.js';

export const getAllBooks = async (req, res) => {
  try {
    const { sort = 'newest' } = req.query;
    const books = await bookService.getAllBooksService(req.pool, sort);
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to get books" });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, price, short_description, cover_image } = req.body;
    const user_id = req.userId;
    const created_at = new Date();

    const result = await bookService.createBookService(req.pool, {
      title, author, price, short_description, cover_image, user_id, created_at
    });

    res.status(201).json({
      message: "Book created successfully",
      bookId: result.insertId,
      createdAt: created_at
    });
  } catch (err) {
    console.error("Error creating book:", err);
    res.status(err.message === "Title, author, and price are required" ? 400 : 500)
      .json({ error: err.message || "Failed to create book" });
  }
};

export const getMyBooks = async (req, res) => {
  try {
    // Add debug logging
    console.log("Auth object:", req.auth);
    
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const books = await bookService.getUserBooksService(req.pool, req.auth.userId);
    res.status(200).json(books);
  } catch (err) {
    console.error("Controller error:", err);
    res.status(500).json({ error: "Failed to get books" });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await bookService.getBookByIdService(req.pool, req.params.id);
    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(err.message === "Book not found" ? 404 : 500)
      .json({ error: err.message || "Failed to get book" });
  }
};

export const updateBook = async (req, res) => {
  try {
    await bookService.updateBookService(
      req.pool,
      req.params.id,
      req.auth.userId,
      req.body
    );
    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(err.status || 500)
      .json({ error: err.error || "Failed to update book" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    await bookService.deleteBookService(
      req.pool,
      req.params.id,
      req.auth.userId
    );
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(err.status || 500)
      .json({ error: err.error || "Failed to delete book" });
  }
};