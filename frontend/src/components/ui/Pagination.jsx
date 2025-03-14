const Pagination = ({ loadMore }) => {
  return (
    <button onClick={loadMore} className="mt-5 bg-teal-600 text-white px-4 py-2 rounded-md">
      Load More
    </button>
  );
};

export default Pagination;
