function ExpenseForm({ form, handleChange, handleSubmit }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold mb-4">Add Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* DESCRIPTION */}
        <label className="block text-sm">
          <span className="block mb-1 text-slate-300">Description</span>

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="e.g. Netflix"
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
          />
        </label>

        {/* AMOUNT + DATE */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm">
            <span className="block mb-1 text-slate-300">Amount</span>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="25.00"
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
            />
          </label>

          <label className="block text-sm">
            <span className="block mb-1 text-slate-300">Date</span>

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
            />
          </label>
        </div>

        {/* CATEGORY */}
        <label className="block text-sm">
          <span className="block mb-1 text-slate-300">Category</span>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
          >
            <option>Bills</option>
            <option>Food</option>
            <option>Fun</option>
          </select>
        </label>

        {/* BUTTON */}
        <button className="w-full rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-900 font-medium px-4 py-2">
          Add Expense
        </button>
      </form>
    </section>
  )
}

export default ExpenseForm
