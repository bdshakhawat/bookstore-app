"use client";
import { useState, useEffect } from "react";
import BookCard from "@/components/ui/BookCard";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import Pagination from "@/components/ui/Pagination";

const BookstPage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ category: "", sort: "newest" });
  const [page, setPage] = useState(1);

  const fetchBooks = async () => {
    const res = await fetch(`http://localhost:5000/books?page=${page}`);
    const data = await res.json();
    setBooks(page === 1 ? data : [...books, ...data]);
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((book) => !filter.category || book.category === filter.category)
    .sort((a, b) => (filter.sort === "price-low" ? a.price - b.price : b.price - a.price));

  const loadMore = () => setPage(page + 1);

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-3xl text-center my-5 font-bold">
        Explore All <span className="text-teal-600">Books</span>
      </h1>
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
