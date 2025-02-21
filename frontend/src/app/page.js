"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [books, setBooks] = useState([]); // State for storing books

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books"); // Fetch books
        setBooks(response.data); // Store books in state
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Bookstore</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mt-2">{book.title}</h2>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">Price: ${book.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
