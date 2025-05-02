import * as bookModel from './bookModel.js';

export const getAllBooksService = async (pool, sort) => {
  return await bookModel.getAllBooks(pool, sort);
};

export const createBookService = async (pool, bookData) => {
  if (!bookData.title || !bookData.author || !bookData.price) {
    throw new Error("Title, author, and price are required");
  }
  return await bookModel.createBook(pool, bookData);
};

export const getBookByIdService = async (pool, id) => {
  const book = await bookModel.getBookById(pool, id);
  if (!book) throw new Error("Book not found");
  return book;
};

export const getUserBooksService = async (pool, userId) => {
  return await bookModel.getUserBooks(pool, userId);
};

export const updateBookService = async (pool, id, userId, bookData) => {
  const ownershipCheck = await bookModel.checkBookOwnership(pool, id, userId);
  if (ownershipCheck.error) throw ownershipCheck;
  return await bookModel.updateBook(pool, id, bookData);
};

export const deleteBookService = async (pool, id, userId) => {
  const ownershipCheck = await bookModel.checkBookOwnership(pool, id, userId);
  if (ownershipCheck.error) throw ownershipCheck;
  return await bookModel.deleteBook(pool, id);
};