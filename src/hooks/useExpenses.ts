import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { db } from '@/lib/db'
import { SyncService } from '@/lib/sync'
import { Expense } from '@/types'

const syncService = SyncService.getInstance()

export function useExpenses() {
  const queryClient = useQueryClient()

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      return await db.expenses.orderBy('date').reverse().toArray()
    },
  })

  const addExpenseMutation = useMutation({
    mutationFn: async (expense: Omit<Expense, 'id' | 'synced' | 'createdAt' | 'updatedAt'>) => {
      return await syncService.addExpense(expense)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
  })

  const totalBalance = expenses.reduce((sum, expense) => {
    return expense.type === 'income' ? sum + expense.amount : sum - expense.amount
  }, 0)

  const totalIncome = expenses
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0)

  const totalExpenses = expenses
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0)

  return {
    expenses,
    isLoading,
    addExpense: addExpenseMutation.mutate,
    isAddingExpense: addExpenseMutation.isPending,
    totalBalance,
    totalIncome,
    totalExpenses,
  }
}