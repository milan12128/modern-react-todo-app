function SearchBar({ search, setSearch }) {
  return (
    <input
      type="search"
      placeholder="🔍 Search tasks..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      className="mb-4 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
    />
  );
}

export default SearchBar;