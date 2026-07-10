import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import SearchBar from "./components/SearchBar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      return savedTasks.map((item) => ({
        ...item,
        id: item.id || crypto.randomUUID(),
        priority: item.priority || "Medium",
        dueDate: item.dueDate || "",
        completed: Boolean(item.completed),
      }));
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const [confirmation, setConfirmation] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const addTask = () => {
    if (!task.trim()) {
      showToast("Please enter a task.", "error");
      return;
    }

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

    showToast("Task added successfully.");
  };

  const requestDeleteTask = (id) => {
    setConfirmation({
      type: "delete",
      id,
      title: "Delete Task",
      message:
        "Are you sure you want to delete this task? This action cannot be undone.",
    });
  };

  const requestClearCompleted = () => {
    if (completedCount === 0) return;

    setConfirmation({
      type: "clearCompleted",
      title: "Clear Completed Tasks",
      message:
        "Are you sure you want to remove all completed tasks? This action cannot be undone.",
    });
  };

  const confirmAction = () => {
    if (!confirmation) return;

    if (confirmation.type === "delete") {
      setTasks((currentTasks) =>
        currentTasks.filter((item) => item.id !== confirmation.id)
      );

      if (editingId === confirmation.id) {
        cancelEditing();
      }

      showToast("Task deleted.", "success");
    }

    if (confirmation.type === "clearCompleted") {
      setTasks((currentTasks) =>
        currentTasks.filter((item) => !item.completed)
      );

      cancelEditing();
      showToast("Completed tasks cleared.", "success");
    }

    setConfirmation(null);
  };

  const cancelConfirmation = () => {
    setConfirmation(null);
  };

  const toggleComplete = (id) => {
    let completedAfterUpdate = false;

    setTasks((currentTasks) =>
      currentTasks.map((item) => {
        if (item.id !== id) return item;

        completedAfterUpdate = !item.completed;

        return {
          ...item,
          completed: completedAfterUpdate,
        };
      })
    );

    showToast(
      completedAfterUpdate ? "Task completed." : "Task marked as pending."
    );
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) {
      showToast("Task text cannot be empty.", "error");
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id
          ? {
              ...item,
              text: editText.trim(),
            }
          : item
      )
    );

    cancelEditing();
    showToast("Task updated successfully.");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const completedCount = tasks.filter((item) => item.completed).length;
  const pendingCount = tasks.length - completedCount;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100);

  const filteredTasks = tasks.filter((item) => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Completed" && item.completed) ||
      (filter === "Pending" && !item.completed);

    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      if (confirmation) {
        cancelConfirmation();
      } else if (editingId) {
        cancelEditing();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [confirmation, editingId]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 transition-colors duration-300 dark:bg-slate-950 sm:p-6">
      <main className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-5 shadow-2xl transition-colors duration-300 dark:bg-slate-900 sm:p-8">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              📝 Modern To-Do App
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Organize your tasks, priorities and deadlines.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDarkMode((currentMode) => !currentMode)}
            className="shrink-0 rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-800 transition hover:scale-105 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        <Dashboard
          total={tasks.length}
          completed={completedCount}
          pending={pendingCount}
          progress={progress}
          clearCompleted={requestClearCompleted}
        />

        <SearchBar search={search} setSearch={setSearch} />

        <div className="mb-4 grid grid-cols-3 gap-2">
          {["All", "Pending", "Completed"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`rounded-lg px-2 py-2 text-sm font-medium transition sm:text-base ${
                filter === option
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
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
          deleteTask={requestDeleteTask}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          startEditing={startEditing}
          saveEdit={saveEdit}
          cancelEditing={cancelEditing}
        />
      </main>

      {confirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              cancelConfirmation();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              ⚠️ {confirmation.title}
            </h2>

            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {confirmation.message}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelConfirmation}
                className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-800 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmAction}
                className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl px-5 py-3 font-medium text-white shadow-xl ${
            toast.type === "error" ? "bg-red-500" : "bg-emerald-600"
          }`}
        >
          {toast.type === "error" ? "⚠️" : "✅"} {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;