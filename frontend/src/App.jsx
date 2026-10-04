import { useState, useEffect } from 'react'

import { expenses as initialExpenses } from './data/dummyData'

import Header from './components/Header'

import ExpenseForm from './components/ExpenseForm'

import Filters from './components/Filters'

import ExpensesTable from './components/ExpensesTable'

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

import { Pie, Bar } from 'react-chartjs-2'
import ChartsSection from './components/ChartsSection'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

function App() {
  // useState()

  // const [expenses, setExpenses] = useState(initialExpenses)

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses')

    return savedExpenses ? JSON.parse(savedExpenses) : initialExpenses
  })

  const [editingExpense, setEditingExpense] = useState(null)

  const [notification, setNotification] = useState('')

  const showNotification = (message) => {
    setNotification(message)

    setTimeout(() => {
      setNotification('')
    }, 2500)
  }

  const [filters, setFilters] = useState({
    category: '',
    start: '',
    end: '',
  })

  const [form, setForm] = useState({
    description: '',
    amount: '',
    date: '',
    category: 'Bills',
  })

  const [editForm, setEditForm] = useState({
    description: '',
    amount: '',
    date: '',
    category: 'Bills',
  })

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const handleOpenEdit = (expense) => {
    setEditingExpense(expense)

    setEditForm({
      description: expense.description,
      amount: String(expense.amount),
      date: expense.date,
      category: expense.category,
    })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUpdateExpense = (e) => {
    e.preventDefault()

    showNotification('Expense Updated')

    setExpenses((prev) =>
      prev.map((expense) => {
        if (expense.id === editingExpense.id) {
          return {
            ...expense,
            description: editForm.description,
            amount: parseFloat(editForm.amount),
            date: editForm.date,
            category: editForm.category,
          }
        }

        return expense
      })
    )

    setEditingExpense(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.description || !form.amount || !form.date) {
      return
    }

    const newExpense = {
      id: Date.now(),
      description: form.description,
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    }

    setExpenses((prev) => [newExpense, ...prev])

    showNotification(`Expense CREATED`)

    setForm({
      description: '',
      amount: '',
      date: '',
      category: 'Bills',
    })
  }

  const handeDelete = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))

    showNotification(`Expense #${id} Deleted`)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const filteredExpenses = expenses.filter((expense) => {
    if (filters.category && expense.category !== filters.category) {
      return false
    }

    // Start date filter
    if (filters.start && expense.date < filters.start) {
      return false
    }

    // End date filter
    if (filters.end && expense.date > filters.end) {
      return false
    }

    return true
  })

  const handleResetFilters = () =>
    setFilters({
      category: '',
      start: '',
      end: '',
    })

  const total = filteredExpenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0)

  const handleCloseEdit = () => {
    setEditingExpense(null)

    setEditForm({
      description: '',
      amount: '',
      date: '',
      category: 'Bills',
    })
  }

  const categoryTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount

    return acc
  }, {})

  const categoryChartData = {
    labels: Object.keys(categoryTotals),

    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ['blue', 'green', 'yellow'],
      },
    ],
  }

  const dateTotals = filteredExpenses.reduce((acc, expense) => {
    acc[expense.date] = (acc[expense.date] || 0) + expense.amount

    return acc
  }, {})

  const dateChartData = {
    labels: Object.keys(dateTotals),

    datasets: [
      {
        label: 'Expenses',
        data: Object.values(dateTotals),
        backgroundColor: ['blue'],
      },
    ],
  }

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#B0CAD6',
        },
      },
    },

    scales: {
      x: {
        ticks: { color: '#B0CAD6' },
        grid: {
          color: '#435C69',
        },
      },

      y: {
        ticks: { color: '#B0CAD6' },
        grid: {
          color: '#435C69',
        },
      },
    },
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 shadow-lg">
          <h1>{notification}</h1>
        </div>
      )}

      <Header />

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* <pre>{JSON.stringify(dateTotals, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(form, null, 2)}</pre>
        <pre>{JSON.stringify(filters, null, 2)}</pre>
        <pre>{JSON.stringify(editingExpense, null, 2)}</pre> */}
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
        <p className="text-slate-400 mb-6">
          Track spending, filter expenses, and visualize your data.
        </p>
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* FILTERS */}

          <Filters
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleResetFilters={handleResetFilters}
          />

          {/* ADD EXPENSE */}
          <ExpenseForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
        {/* TOTAL */}
        <div className="mt-6 mb-3">
          <span className="text-sm text-slate-300 mr-2">Total:</span>

          <span className="inline-block rounded-xl border border-slate-700 bg-slate-800 px-3 py-1 font-semibold">
            {/* $1,315.00 */}${total.toFixed(2)}
          </span>
        </div>
        {/* EXPENSES TABLE */}

        <ExpensesTable
          filteredExpenses={filteredExpenses}
          handleOpenEdit={handleOpenEdit}
          handleDelete={handeDelete}
        />

        {/* CHART PLACEHOLDERS */}

        <ChartsSection
          categoryChartData={categoryChartData}
          dateChartData={dateChartData}
          chartOptions={chartOptions}
        />
      </main>

      {/* Edit MODAL  */}

      {editingExpense && (
        <div
          onClick={handleCloseEdit}
          className="fixed inset-0 bg-black/50 flex items-center justify-center px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-5"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>

            <form onSubmit={handleUpdateExpense} className="space-y-3">
              <label className="block text-sm">
                <span className="block mb-1 text-slate-300">Description</span>

                <input
                  type="text"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
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
                    value={editForm.amount}
                    onChange={handleEditChange}
                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
                  />
                </label>

                <label className="block text-sm">
                  <span className="block mb-1 text-slate-300">Date</span>

                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
                  />
                </label>
              </div>

              {/* CATEGORY */}
              <label className="block text-sm">
                <span className="block mb-1 text-slate-300">Category</span>

                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2"
                >
                  <option>Bills</option>
                  <option>Food</option>
                  <option>Fun</option>
                </select>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditingExpense(null)}
                  className="mt-4 rounded-xl bg-slate-800 px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="mt-4 rounded-xl bg-slate-800 px-4 py-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="max-w-6xl mx-auto px-4 pb-8 text-xs text-slate-500">
        Built with React & Tailwind CSS
      </footer>
    </div>
  )
}

export default App
