import { useState } from 'react'
import { Wallet, CheckCircle, Banknote, Home, Car, Utensils } from 'lucide-react'

interface TransactionFormProps {
  type: 'expense' | 'income'
  onSubmit: (data: {
    amount: number
    category: string
    description: string
    date: string
    type: 'expense' | 'income'
  }) => void
  onCancel: () => void
}

const CATEGORY_OPTIONS = [
  { label: 'Salary', icon: Banknote },
  { label: 'Rent', icon: Home },
  { label: 'Fuel & Maintenance', icon: Car },
  { label: 'Food', icon: Utensils },
]

export function TransactionForm({ type, onSubmit, onCancel }: TransactionFormProps) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !category) return
    onSubmit({
      amount: parseFloat(amount),
      category,
      description,
      date,
      type,
    })
    setSuccess(true)
    setAmount('')
    setCategory('')
    setDescription('')
    setDate(new Date().toISOString().slice(0, 10))
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-2xl mb-10 border border-gray-100 max-w-md mx-auto relative z-10">
      <div className="flex items-center gap-3 mb-8">
        <Wallet className="h-7 w-7 text-blue-400" />
        <h3 className="text-2xl font-bold text-gray-800">Add {type === 'income' ? 'Income' : 'Expense'}</h3>
      </div>
      {success && (
        <div className="mb-6 flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-center font-semibold border border-green-200 justify-center">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Transaction added successfully!
        </div>
      )}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Amount</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
          required
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map(opt => (
            <option key={opt.label} value={opt.label}>{opt.label}</option>
          ))}
        </select>
        {category && (
          <div className="flex items-center gap-2 mt-2 text-gray-500">
            {CATEGORY_OPTIONS.find(opt => opt.label === category)?.icon &&
              (CATEGORY_OPTIONS.find(opt => opt.label === category)?.icon!({ className: 'h-5 w-5' }))}
            <span>{category}</span>
          </div>
        )}
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
        <input
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
        />
      </div>
      <div className="mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 shadow-sm"
          required
        />
      </div>
      <div className="mb-8">
        <label className="block text-sm font-medium mb-1 text-gray-700">Type</label>
        <input
          type="text"
          value={type.charAt(0).toUpperCase() + type.slice(1)}
          disabled
          className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 text-gray-500"
        />
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-7 rounded-xl shadow-sm border border-gray-300 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`$${type === 'income' ? 'bg-green-400 hover:bg-green-500' : 'bg-red-400 hover:bg-red-500'} text-white font-semibold py-2 px-7 rounded-xl shadow-sm transition`}
        >
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </div>
    </form>
  )
} 