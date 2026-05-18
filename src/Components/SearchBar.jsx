function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search products"
      value={search}
      onChange={function (e) {
        setSearch(e.target.value);
      }}
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "14px",
        width: "220px",
      }}
    />
  );
}

export default SearchBar;
