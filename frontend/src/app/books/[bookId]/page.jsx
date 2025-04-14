// import BookDetailsCard from "@/components/ui/BookDetailsCard";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// export const generateStaticParams = async () => {
//   const res = await fetch(`${BASE_URL}/books`);
  
//   if (!res.ok) {
//     throw new Error("Failed to fetch books in generateStaticParams");
//   }

//   const books = await res.json();

//   return books.map((book) => ({
//     bookId: book.id.toString(),
//   }));
// };

// const BookDetailPage = async ({ params }) => {
//   const { bookId } = params;
//   const res = await fetch(`${BASE_URL}/books/${bookId}`);
  
//   if (!res.ok) {
//     // You could also return a 404 page here if you prefer
//     throw new Error(`Failed to fetch book with ID ${bookId}`);
//   }

//   const book = await res.json();

//   return (
//     <div className="my-10">
//       <BookDetailsCard book={book} />
//     </div>
//   );
// };

// export default BookDetailPage;

import BookDetailsCard from "@/components/ui/BookDetailsCard";

export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:5000/books");
  const books = await res.json();
  return books.map((book) => ({
    bookId: book.id.toString(),
  }));
};



const BookDetailPage = async({params}) => {
    // Destructuring the blogId from params
    const {bookId} = await params;
    const res =await fetch(`http://localhost:5000/books/${bookId}`);
    const book= await res.json();
    
    return (
        <div className="my-10">
            <BookDetailsCard book={book} />
        </div>
      );
  };

export default  BookDetailPage;
