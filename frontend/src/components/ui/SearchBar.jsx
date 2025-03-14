// components/SearchBar.js
const SearchBar = ({ searchQuery, setSearchQuery }) => {
    // Function to handle changes in the search input
  const handleSearch = (e) => {
    // Update the searchQuery state with the new value
    setSearchQuery(e.target.value);
    // Optionally, you can log the updated value (though it may not be immediate)
    console.log(e.target.value);
  };

  return (
    <div className="my-5 flex justify-center">
      <input
        type="text"
        placeholder="Search by title, author, or keywords..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );
};

export default SearchBar;