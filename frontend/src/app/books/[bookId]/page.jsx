import BookDetailsCard from "@/components/ui/BookDetailsCard";

// Generate static paths for each book
export async function generateStaticParams() {
  try {
    const res = await fetch(`http://localhost:5000/books`);

    if (!res.ok) {
      throw new Error(`Failed to fetch books: ${res.status}`);
    }

    const books = await res.json();

    return books.map((book) => ({
      bookId: book.id.toString(),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return []; // Prevent build crash
  }
}

// Page component for a single book
const BookDetailPage = async ({ params }) => {
  const { bookId } = params;

  try {
    const res = await fetch(
      `http://localhost:5000/books/${bookId}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch book ${bookId}: ${res.status}`);
    }

    const book = await res.json();

    return (
      <div className="my-10">
        <BookDetailsCard book={book} />
      </div>
    );
  } catch (error) {
    console.error("Error loading book detail page:", error);
    return (
      <div className="my-10 text-red-500">
        Failed to load book details. Please try again later.
      </div>
    );
  }
};

export default BookDetailPage;


