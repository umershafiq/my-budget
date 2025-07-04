'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface BalanceCardProps {
  totalBalance: number
  totalIncome: number
  totalExpenses: number
}

export function BalanceCard({ totalBalance, totalIncome, totalExpenses }: BalanceCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mx-4 mb-6 shadow-xl"
    >
      <div className="text-center mb-6">
        <p className="text-gray-600 text-sm font-medium uppercase tracking-wider">Total Balance</p>
        <p className={`text-4xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(totalBalance)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Income</span>
          </div>
          <p className="text-lg font-semibold text-green-600">{formatCurrency(totalIncome)}</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <TrendingDown className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-gray-600">Expenses</span>
          </div>
          <p className="text-lg font-semibold text-red-600">{formatCurrency(totalExpenses)}</p>
        </div>
      </div>
    </motion.div>
  )
}