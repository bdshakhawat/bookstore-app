import express from 'express';
import cors from "cors";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import pool from './db.js';
import { bookRouter } from './modules/books/bookRoutes.js';

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Debugging middleware - logs all incoming requests
app.use((req, res, next) => {
  console.log('\n=== Incoming Request ===');
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', {
    authorization: req.headers.authorization,
    'content-type': req.headers['content-type']
  });
  console.log('Body:', req.body);
  next();
});

// Enhanced auth middleware with debugging
export const requireAuth = ClerkExpressWithAuth({
  onError: (error) => {
    console.error('Clerk Auth Error:', error);
    throw error;
  }
});

// Test endpoint to verify token
app.get('/verify-token', requireAuth, (req, res) => {
  console.log('\n=== Token Verification ===');
  console.log('Authenticated User:', req.auth);
  res.json({ 
    success: true,
    userId: req.auth.userId,
    sessionId: req.auth.sessionId,
    tokenData: req.auth
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Store API!');
});

// Book routes with debug logging
const router = bookRouter(pool);
app.use('/books', (req, res, next) => {
  console.log('\n=== Book Route Access ===');
  console.log('Path:', req.path);
  console.log('Auth Header:', req.headers.authorization);
  router(req, res, next);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('\n=== Global Error ===');
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server with debug info
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`\nServer running on port ${PORT}`);
//   console.log('Available routes:');
//   console.log('- GET    /');
//   console.log('- GET    /verify-token (protected)');
//   console.log('- GET    /books/my-books (protected)');
//   console.log('- POST   /books (protected)');
//   console.log('- PUT    /books/:id (protected)');
//   console.log('- DELETE /books/:id (protected)');
// });

export default app;