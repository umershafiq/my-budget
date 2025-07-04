'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BalanceCard } from '@/components/Dashboard/BalanceCard'
import { useExpenses } from '@/hooks/useExpenses'

const queryClient = new QueryClient()

function AppContent() {
  const { expenses, totalBalance, totalIncome, totalExpenses } = useExpenses()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-sm p-4 text-center">
          <h1 className="text-2xl font-bold text-white">My Budget</h1>
          <p className="text-white/80 text-sm">Track your expenses securely</p>
        </div>
        
        <BalanceCard
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />
        
        {/* Add Expense and Add Income Buttons */}
        <div className="flex gap-4 justify-center my-6">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl text-lg flex items-center gap-2"
            onClick={() => alert('Add Expense clicked!')}
          >
            <span className="text-2xl">&#8722;</span> Add Expense
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl text-lg flex items-center gap-2"
            onClick={() => alert('Add Income clicked!')}
          >
            <span className="text-2xl">&#43;</span> Add Income
          </button>
        </div>
        
        <div className="px-4">
          <h2 className="text-white font-semibold mb-4">Recent Transactions</h2>
          {expenses.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <p>No transactions yet</p>
              <p className="text-sm">Add your first expense to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {expenses.slice(0, 5).map((expense) => (
                <div
                  key={expense.id}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{expense.category}</p>
                    <p className="text-sm text-gray-600">{expense.description}</p>
                  </div>
                  <p className={`font-semibold ${
                    expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {expense.type === 'income' ? '+' : '-'}${expense.amount}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}