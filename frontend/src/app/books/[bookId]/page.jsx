
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
    const { bookId} = params;
    const res =await fetch(`http://localhost:5000/books/${bookId}`);
    const book= await res.json();
    
    return (
        <div className="my-10">
            <BookDetailsCard book={book} />
        </div>
      );
  };

export default  BookDetailPage;
