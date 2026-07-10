function TodoItem({
  item,
  toggleComplete,
  deleteTask,
  editingId,
  editText,
  setEditText,
  startEditing,
  saveEdit,
  cancelEditing,
}) {
  const priorityStyles = {
    High: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    Medium:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    Low: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  };

  const formattedDate = item.dueDate
    ? new Date(`${item.dueDate}T00:00:00`).toLocaleDateString()
    : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDueDate = item.dueDate
    ? new Date(`${item.dueDate}T00:00:00`)
    : null;

  const isOverdue =
    taskDueDate && taskDueDate < today && !item.completed;

  const isEditing = editingId === item.id;

  return (
    <li
      className={`mb-3 rounded-xl border p-4 shadow-sm transition ${
        isOverdue
          ? "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950/40"
          : "border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          {isEditing ? (
            <input
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  saveEdit(item.id);
                }

                if (event.key === "Escape") {
                  cancelEditing();
                }
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              autoFocus
            />
          ) : (
            <button
              type="button"
              onClick={() => toggleComplete(item.id)}
              className={`block w-full break-words text-left text-base font-medium ${
                item.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-800 dark:text-slate-100"
              }`}
            >
              {item.completed ? "✅ " : "⬜ "}
              {item.text}
            </button>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                priorityStyles[item.priority] || priorityStyles.Medium
              }`}
            >
              {item.priority || "Medium"} Priority
            </span>

            {formattedDate && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  isOverdue
                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                }`}
              >
                📅 {formattedDate}
                {isOverdue ? " · Overdue" : ""}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:shrink-0">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => saveEdit(item.id)}
                className="rounded-lg bg-green-500 px-3 py-2 text-white transition hover:bg-green-600"
              >
                Save
              </button>

              <button
                type="button"
                onClick={cancelEditing}
                className="rounded-lg bg-slate-500 px-3 py-2 text-white transition hover:bg-slate-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => startEditing(item)}
              className="rounded-lg bg-yellow-500 px-3 py-2 text-white transition hover:bg-yellow-600"
            >
              Edit
            </button>
          )}

          <button
            type="button"
            onClick={() => deleteTask(item.id)}
            className="rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;