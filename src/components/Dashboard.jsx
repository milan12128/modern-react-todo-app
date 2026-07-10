function Dashboard({
  total,
  completed,
  pending,
  progress,
  clearCompleted,
}) {
  return (
    <section className="mb-6">
      <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">
        <div className="rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-800 sm:p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            Total
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {total}
          </h2>
        </div>

        <div className="rounded-xl bg-green-100 p-3 text-center dark:bg-green-950 sm:p-4">
          <p className="text-xs text-green-700 dark:text-green-400 sm:text-sm">
            Completed
          </p>

          <h2 className="text-xl font-bold text-green-700 dark:text-green-400 sm:text-2xl">
            {completed}
          </h2>
        </div>

        <div className="rounded-xl bg-orange-100 p-3 text-center dark:bg-orange-950 sm:p-4">
          <p className="text-xs text-orange-700 dark:text-orange-400 sm:text-sm">
            Pending
          </p>

          <h2 className="text-xl font-bold text-orange-700 dark:text-orange-400 sm:text-2xl">
            {pending}
          </h2>
        </div>
      </div>

      <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-medium text-slate-700 dark:text-slate-200">
            Task Progress
          </p>

          <p className="font-semibold text-indigo-600 dark:text-indigo-400">
            {progress}%
          </p>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-300 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {completed} of {total} tasks completed
          </p>

          <button
            type="button"
            onClick={clearCompleted}
            disabled={completed === 0}
            className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;