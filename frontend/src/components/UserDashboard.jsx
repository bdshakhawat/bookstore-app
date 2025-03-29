"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useClerk, useAuth } from "@clerk/nextjs";
import Image from "next/image";

export default function UserDashboard() {
  const [userBooks, setUserBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    short_description: "",
    cover_image: "",
  });
  // State Management for update modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // State Management for delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEditBook, setCurrentEditBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const router = useRouter();
  const { signOut } = useClerk();
  const { getToken, userId } = useAuth();

  // Fetch user's books
  const fetchUserBooks = async () => {
    try {
      const token = await getToken();
      //  Calls sorted endpoint
      const response = await axios.get("http://localhost:5000/my-books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserBooks(response.data);
    } catch (err) {
      console.error("Error fetching user's books:", err);
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  // Add a new book
  const addBook = async () => {
    try {
      // Only validate required fields
      if (!newBook.title || !newBook.author || !newBook.price) {
        setError("Title, author, and price are required");
        return;
      }
      
      const token = await getToken();
      await axios.post(
        "http://localhost:5000/book",
        { ...newBook, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setSuccessMessage("Book added successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchUserBooks();
      setNewBook({
        title: "",
        author: "",
        price: "",
        short_description: "",
        cover_image: "",
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add book");
      console.error("Error adding book:", err);
    }
  };

  //  Trigger Edit Modal
  const handleEditClick = (book) => {
    // Stores pre-fills with current book data in state
    setCurrentEditBook(book);
    // Opens modal
    setIsEditModalOpen(true);
    setError(null);
  };

  //  Trigger Delete Modal
  const handleDeleteClick = (book) => {
    // Stores delete book data in state
    setBookToDelete(book);
    // Opens delete modal
    setIsDeleteModalOpen(true);
  };

  // Update book
  const handleUpdateBook = async (updatedBook) => {
    try {
      setError(null);
      if (!updatedBook.title || !updatedBook.author || !updatedBook.price) {
        setError("Title, author, and price are required");
        return;
      }

      const token = await getToken();
      await axios.put(
        `http://localhost:5000/books/${updatedBook.id}`,
        updatedBook,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Book updated successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchUserBooks();
      setIsEditModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update book");
      console.error("Error updating book:", err);
    }
  };

  // Delete book
  const confirmDeleteBook = async () => {
    try {
      const token = await getToken();
      await axios.delete(`http://localhost:5000/books/${bookToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Book deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchUserBooks();
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Error deleting book:", err);
      setIsDeleteModalOpen(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
    setError(null);
  };

  // Edit Modal Component
  const EditBookModal = ({ book, onClose, onUpdate, error }) => {
    const [editedBook, setEditedBook] = useState(book);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedBook(prev => ({ ...prev, [name]: value }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Edit Book</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={editedBook.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                required
                value={editedBook.author}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="price"
                required
                value={editedBook.price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="short_description"
                value={editedBook.short_description}
                onChange={handleChange}
                className="w-full p-2 border rounded h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image URL
              </label>
              <input
                type="text"
                name="cover_image"
                value={editedBook.cover_image}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onUpdate(editedBook)}
                className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delete Confirmation Modal
  const DeleteConfirmationModal = ({ book, onClose, onConfirm }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Confirm Delete</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          
          <p className="mb-6">Are you sure you want to delete "<span className="font-semibold">{book?.title}</span>" by {book?.author}?</p>
          
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>

      <div className="flex justify-end space-x-4 mb-6">
        <button
          onClick={() => router.push("/settings")}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Settings
        </button>
        <button
          onClick={() => {
            signOut();
            router.push("/");
          }}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      {/* Add New Book Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <p className="text-sm text-gray-500 mb-4">
          Fields marked with <span className="text-red-500">*</span> are required
        </p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              required
              placeholder="Book title"
              value={newBook.title}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="author" className="text-sm font-medium text-gray-700 mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              id="author"
              type="text"
              name="author"
              required
              placeholder="Author name"
              value={newBook.author}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              type="text"
              name="price"
              required
              placeholder="0.00"
              value={newBook.price}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="short_description"
              placeholder="Book description (optional)"
              value={newBook.short_description}
              onChange={handleInputChange}
              className="p-2 border rounded h-24"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-1">
              Cover Image URL
            </label>
            <input
              id="image"
              type="text"
              name="cover_image"
              placeholder="Image URL (optional)"
              value={newBook.cover_image}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>

          <button
            onClick={addBook}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
          >
            Add Book
          </button>
        </div>
      </div>

      {/* Display User's Books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* // Renders books in received order */}
        {userBooks.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg shadow-md">
            <figure>
              <Image
                src="/images/book1.jpg"
                 alt={book.title ? `Cover image for ${book.title}` : "Book cover image"}
                width={500}
                height={500}
                className="h-96 w-full object-cover"
              />
            </figure>
            <div className="p-4">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Price: ${book.price}</p>
              <p className="text-gray-600">Description: {book.short_description}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEditClick(book)}
                className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(book)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Book Modal */}
      {isEditModalOpen && (
        <EditBookModal
          book={currentEditBook}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateBook}
          error={error}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          book={bookToDelete}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDeleteBook}
        />
      )}
    </div>
  );
}



