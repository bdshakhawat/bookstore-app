const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-4">
      <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
        <option value="">All Categories</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-fiction</option>
      </select>

      <select value={filter.sort} onChange={(e) => setFilter({ ...filter, sort: e.target.value })}>
        <option value="newest">Newest First</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
};

export default FilterBar;
