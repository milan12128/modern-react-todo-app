function Dashboard({ total, completed, pending }) {
  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      <div className="bg-slate-100 rounded-xl p-4 text-center">
        <p className="text-sm text-slate-500">Total</p>
        <h2 className="text-2xl font-bold">{total}</h2>
      </div>

      <div className="bg-green-100 rounded-xl p-4 text-center">
        <p className="text-sm text-green-700">Completed</p>
        <h2 className="text-2xl font-bold text-green-700">{completed}</h2>
      </div>

      <div className="bg-orange-100 rounded-xl p-4 text-center">
        <p className="text-sm text-orange-700">Pending</p>
        <h2 className="text-2xl font-bold text-orange-700">{pending}</h2>
      </div>
    </div>
  );
}

export default Dashboard;