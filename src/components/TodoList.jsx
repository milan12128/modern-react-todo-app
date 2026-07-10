import TodoItem from "./TodoItem";

function TodoList({
  tasks,
  toggleComplete,
  deleteTask,
  editingId,
  editText,
  setEditText,
  startEditing,
  saveEdit,
  cancelEditing,
}) {
  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500 dark:text-slate-400">
        <p className="mb-3 text-5xl">📭</p>

        <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
          No tasks found
        </p>

        <p className="mt-1 text-sm">
          Add your first task or change the current search/filter.
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-6">
      {tasks.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          startEditing={startEditing}
          saveEdit={saveEdit}
          cancelEditing={cancelEditing}
        />
      ))}
    </ul>
  );
}

export default TodoList;