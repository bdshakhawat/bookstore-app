export const checkBookOwnership = async (bookId, userId, pool) => {
  const [rows] = await pool.query("SELECT user_id FROM books WHERE id = ?", [bookId]);

  if (rows.length === 0) {
    return { error: "Book not found", status: 404 };
  }

  if (rows[0].user_id !== userId) {
    return { error: "You are not authorized to modify this book", status: 403 };
  }

  return { success: true };
};

