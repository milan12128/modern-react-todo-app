import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      return savedTasks.map((item) => ({
        ...item,
        id: item.id || crypto.randomUUID(),
        priority: item.priority || "Medium",
        dueDate: item.dueDate || "",
      }));
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: task.trim(),
      completed: false,
      priority,
      dueDate,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);

    setTask("");
    setPriority("Medium");
    setDueDate("");
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((item) => item.id !== id)
    );

    if (editingId === id) {
      setEditingId(null);
      setEditText("");
    }
  };

  const toggleComplete = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id
          ? { ...item, text: editText.trim() }
          : item
      )
    );

    setEditingId(null);
    setEditText("");
  };

  const completedCount = tasks.filter((item) => item.completed).length;
  const pendingCount = tasks.length - completedCount;

  const filteredTasks = tasks.filter((item) => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && item.completed) ||
      (filter === "Pending" && !item.completed);

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-4 sm:p-6">
      <main className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-5 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          📝 Modern To-Do App
        </h1>

        <Dashboard
          total={tasks.length}
          completed={completedCount}
          pending={pendingCount}
        />

        <SearchBar search={search} setSearch={setSearch} />

        <div className="grid grid-cols-3 gap-2 mb-4">
          {["All", "Pending", "Completed"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`py-2 px-2 rounded-lg text-sm sm:text-base font-medium transition ${
                filter === option
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <TodoForm
          task={task}
          setTask={setTask}
          priority={priority}
          setPriority={setPriority}
          dueDate={dueDate}
          setDueDate={setDueDate}
          addTask={addTask}
        />

        <TodoList
          tasks={filteredTasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          startEditing={startEditing}
          saveEdit={saveEdit}
        />
      </main>
    </div>
  );
}

export default App;