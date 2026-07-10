function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border border-slate-300 rounded-lg p-3 mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
}

export default SearchBar;