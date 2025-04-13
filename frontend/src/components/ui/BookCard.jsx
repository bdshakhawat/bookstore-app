
import Image from "next/image";
import Link from "next/link";
const BookCard = ({book}) => {
    return (
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden relative group">
        {/* Book image */}
          <figure className="relative">
            <Image
              src="/images/book1.jpg" 
              width={400}
              height={400}
              alt="book image"
              className="rounded-t-lg h-64 object-cover"
           />
         </figure>
        {/* Book details */}
         <div className="p-3">
        
           <h2 className="text-xl font-bold mt-4 text-center">
             {book.title.length > 30
              ? book.title.slice(0, 30) + "..."
              : book.title}
            </h2>
            <p className="text-gray-400 mt-2">
               {book.short_description?.length > 100
                ? book.short_description.slice(0, 60) + "..."
                : book.short_description}
             </p>

           
          
        <div className="flex justify-between items-center mt-5">
          <div className="flex items-center">
            
            <span className="text-sm font-medium text-gray-500 ">
              {book.author}
            </span>
            
          </div>
           <div className="flex items-center text-sm text-gray-700 ">
              <Link href={`/books/${book.id}`} className="text-teal-600 ml-1">
                  <button className="text-teal-600 bg-teal-100 py-1 px-3 rounded-full ">View Details</button>
               </Link>
          </div> 
        </div>
      </div>
      {/* Hover overlay */}
     <div className="absolute inset-0 bg-black bg-opacity-80 text-white p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h2 className="text-xl font-bold text-center">
          {book.title.length > 30
            ? book.title.slice(0, 30) + "..."
            : book.title}
        </h2>
        <p className="text-gray-300 mt-2">
          {book.short_description} 
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-300">Author: {book.author}</p>
          <p className="text-sm text-gray-300">Rating: {book.rating || "N/A"}</p> {/* Add rating if available */}
        </div>
        <div className="mt-4 text-center">
          <Link href={`/books/${book.id}`}>
            <button className="text-teal-600 bg-white py-1 px-3 rounded-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
    

    );
};

export default BookCard;