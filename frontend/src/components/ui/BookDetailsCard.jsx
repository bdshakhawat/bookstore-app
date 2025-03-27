
import Image from "next/image";
const BookDetailsCard = ({ book} ) => {
  return (
    <div className="w-2/3 bg-white shadow-lg rounded-lg mx-auto p-6">
      
      <h2 className="text-center text-4xl font-semibold my-5">{book.title}</h2>
       <div className="flex items-center justify-center bg-gray-100 mb-5 py-2 rounded-lg gap-2">
       

        <span className="text-lg font-medium">{book.author}</span>
      </div> 
      <figure className="mb-5">
        <Image
          src="/images/book1.jpg"
          width={600}
          height={100}
          alt="book image"
          className="rounded-lg w-full object-cover"
        />
      </figure>
      <div className="text-gray-700 text-lg leading-relaxed">
        <p className="text-justify text-gray-500">{book.short_description}</p>
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center text-xl text-gray-600">
          <span className="mr-1">{book.price}</span>
          Price
        </div>
      </div>
    </div>
  );
};

export default BookDetailsCard;
