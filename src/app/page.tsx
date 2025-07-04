'use client'

import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { BalanceCard } from '@/components/Dashboard/BalanceCard'
import { useExpenses } from '@/hooks/useExpenses'
import { AuthService } from '@/lib/auth'

const queryClient = new QueryClient()

const BiometricAuth = dynamic(() => import('@/components/Auth/BiometricAuth'), { ssr: false })

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { expenses, totalBalance, totalIncome, totalExpenses } = useExpenses()

  useEffect(() => {
    const authService = AuthService.getInstance()
    const authenticated = authService.isUserAuthenticated()
    setIsAuthenticated(authenticated)
    setIsLoading(false)
  }, [])

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <BiometricAuth onAuthenticated={handleAuthenticated} />
  }

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