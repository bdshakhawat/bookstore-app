"use client";
import { useState, useEffect, useCallback } from "react";
import BookCard from "@/components/ui/BookCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import Pagination from "@/components/ui/Pagination";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const BookstPage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ category: "", sort: "newest" });
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { signOut } = useClerk();


  const fetchBooks = async () => {
    const res = await fetch(`http://localhost:5000/books?page=${page}&sort=${filter.sort}`);
    const data = await res.json();
    setBooks(page === 1 ? data : [...books, ...data]);
  };
  useEffect(() => {
  const fetchBooks = async () => {
    const res = await fetch(`http://localhost:5000/books?page=${page}&sort=${filter.sort}`);
    const data = await res.json();
    setBooks(page === 1 ? data : [...books, ...data]);
  };

  fetchBooks();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [page, filter.sort]); 


   


  

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((book) => !filter.category || book.category === filter.category);

  const loadMore = () => setPage(page + 1);

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-3xl text-center my-5 font-bold">
        Explore All <span className="text-teal-600">Books</span>
      </h1>
      <button
        onClick={() => {
          signOut();
          router.push("/");
        }}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterBar filter={filter} setFilter={setFilter} />

      <div className="grid grid-cols-3 gap-4 my-5">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <Pagination loadMore={loadMore} />
    </div>
  );
};

export default BookstPage;



