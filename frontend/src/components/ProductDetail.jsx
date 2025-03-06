"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserButton, SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function ProductDetail() {
  const [books, setBooks] = useState([]); 
  const { isSignedIn, user, isLoaded } = useUser(); 
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/books"); 
        setBooks(response.data); 
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  // Redirect to dashboard if user is signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard"); 
    }
  }, [isSignedIn, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Bookstore</h1>
      <div className="flex justify-end mb-4">
        <SignedIn>
          <div className="flex items-center">
            {user && <p className="mr-4">Welcome, {user.firstName}!</p>}
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
        <SignedOut>
          {/* Pass redirectUrl directly to SignInButton */}

          {/* <SignInButton redirectUrl="/dashboard" /> */}
          <SignInButton  />
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