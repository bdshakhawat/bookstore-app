
import Image from "next/image";
import Link from "next/link";
const BookCard = ({book}) => {
    return (
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <figure>
            <Image
              src="/images/book1.jpg" 
              width={400}
              height={400}
              alt="book image"
              className="rounded-t-lg h-64 object-cover"
           />
         </figure>
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
    </div>

    );
};

export default BookCard;