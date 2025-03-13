import BookCard from "@/components/ui/BookCard";


const BookstPage =async () => {
    const res=await fetch("http://localhost:5000/books" );
    const books=await res.json();
    console.log(books);
    return (
        <div className="w-[90%] mx-auto">
            <h1 className="text-3xl text-center my-5 font-bold">
               Explore All <span className="text-teal-600">Books</span>
            </h1>
            <p className="text-center text-gray-400 w-2/5 mx-auto">
              <i>
               Dive into the fascinating world of Reading books, where unlocking
                unprecedented knowledge and enriching your power.
               </i>
            </p>
            <div className= "grid grid-cols-3 gap-4 my-5 ">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>

    );
};

export default BookstPage;