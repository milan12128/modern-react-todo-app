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
}) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500">
        <p className="text-4xl mb-3">📭</p>
        <p className="font-semibold">No tasks found</p>
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
        />
      ))}
    </ul>
  );
}

export default TodoList;