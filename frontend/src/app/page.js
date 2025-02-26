"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserButton, SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

export default function Home() {
  // State for storing books
  const [books, setBooks] = useState([]); 
  // Add isLoaded to check if Clerk has finished loading
  const { isSignedIn, user, isLoaded } = useUser(); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch books from the backend API
        const response = await axios.get("http://localhost:5000/books"); 
        // Store books in state
        setBooks(response.data); 
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  // If Clerk is still loading, show a loading state
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Bookstore</h1>
      <div className="flex justify-end mb-4">
        <SignedIn>
          <div className="flex items-center">
            {/* Check if user exists before accessing firstName */}
            {user && <p className="mr-4">Welcome, {user.firstName}!</p>}
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
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