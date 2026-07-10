function TodoForm({
  task,
  setTask,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  addTask,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    addTask();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task..."
        value={task}
        onChange={(event) => setTask(event.target.value)}
        className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
          className="border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;