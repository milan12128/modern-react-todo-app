function TodoItem({
  item,
  toggleComplete,
  deleteTask,
  editingId,
  editText,
  setEditText,
  startEditing,
  saveEdit,
}) {
  const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const formattedDate = item.dueDate
    ? new Date(`${item.dueDate}T00:00:00`).toLocaleDateString()
    : null;

  return (
    <li className="bg-slate-100 p-4 rounded-xl mb-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          {editingId === item.id ? (
            <input
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  saveEdit(item.id);
                }
              }}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />
          ) : (
            <button
              type="button"
              onClick={() => toggleComplete(item.id)}
              className={`block text-left break-words ${
                item.completed
                  ? "line-through text-slate-400"
                  : "text-slate-800"
              }`}
            >
              {item.completed ? "✅ " : "⬜ "}
              {item.text}
            </button>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                priorityStyles[item.priority] || priorityStyles.Medium
              }`}
            >
              {item.priority || "Medium"} Priority
            </span>

            {formattedDate && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                📅 {formattedDate}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {editingId === item.id ? (
            <button
              type="button"
              onClick={() => saveEdit(item.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={() => startEditing(item)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
            >
              Edit
            </button>
          )}

          <button
            type="button"
            onClick={() => deleteTask(item.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default TodoItem;