import express from 'express';
import { requireAuth } from '../../middleware/clerkAuth.js';
import {
  getAllBooks,
  createBook,
  getMyBooks,
  getBook,
  updateBook,
  deleteBook
} from './bookController.js';


export const bookRouter = (pool) => {
  const router = express.Router();
  
  // Middleware to attach pool to request
  router.use((req, res, next) => {
    req.pool = pool;
    next();
  });

  router.get('/', getAllBooks);
  router.post('/', createBook);
  router.get('/my-books', requireAuth, getMyBooks);
  router.get('/:id', getBook);
  router.put('/:id', updateBook);
  router.delete('/:id', deleteBook);

  return router;
};