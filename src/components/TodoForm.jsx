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
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
    >
      <label
        htmlFor="task"
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        Task
      </label>

      <input
        id="task"
        type="text"
        placeholder="Enter your task and press Enter..."
        value={task}
        onChange={(event) => setTask(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
      />

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="priority"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Priority
          </label>

          <select
            id="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="due-date"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Due date
          </label>

          <input
            id="due-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.99]"
      >
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;