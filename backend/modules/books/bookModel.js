export const getAllBooks = async (pool, sort = 'newest') => {
  let orderBy;
  switch (sort) {
    case "price-low":
      orderBy = "price ASC";
      break;
    case "price-high":
      orderBy = "price DESC";
      break;
    default:
      orderBy = "created_at DESC";
  }
  const [rows] = await pool.query(`SELECT * FROM books ORDER BY ${orderBy}`);
  return rows;
};

export const createBook = async (pool, bookData) => {
  const { title, author, price, short_description, cover_image, user_id, created_at } = bookData;
  const [result] = await pool.query(
    "INSERT INTO books (title, author, price, short_description, cover_image, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, author, price, short_description, cover_image, user_id, created_at]
  );
  return result;
};

export const getBookById = async (pool, id) => {
  const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
  return rows[0] || null;
};

export const getUserBooks = async (pool, userId) => {
  const [rows] = await pool.query(
    "SELECT * FROM books WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
};

export const updateBook = async (pool, id, bookData) => {
  const { title, author, price, short_description, cover_image } = bookData;
  await pool.query(
    "UPDATE books SET title = ?, author = ?, price = ?, short_description = ?, cover_image = ? WHERE id = ?",
    [title, author, price, short_description, cover_image, id]
  );
};

export const deleteBook = async (pool, id) => {
  await pool.query("DELETE FROM books WHERE id = ?", [id]);
};

export const checkBookOwnership = async (pool, bookId, userId) => {
  const book = await getBookById(pool, bookId);
  if (!book) {
    return { error: "Book not found", status: 404 };
  }
  if (book.user_id !== userId) {
    return { error: "Unauthorized: You don't own this book", status: 403 };
  }
  return { success: true };
};