import { db } from './db'
import { Expense } from '@/types'

export class SyncService {
  private static instance: SyncService
  private isOnline = true

  static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService()
    }
    return SyncService.instance
  }

  constructor() {
    // Removed window event listeners for online/offline
    // Online/offline sync is not supported in SSR/SSG environments
  }

  async addExpense(expense: Omit<Expense, 'id' | 'synced' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      synced: this.isOnline,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.expenses.add(newExpense)

    if (this.isOnline) {
      this.syncExpense(newExpense)
    }

    return newExpense.id
  }

  async syncPendingExpenses(): Promise<void> {
    if (!this.isOnline) return

    const unsyncedExpenses = await db.expenses.filter(exp => !exp.synced).toArray()
    
    for (const expense of unsyncedExpenses) {
      await this.syncExpense(expense)
    }
  }

  private async syncExpense(expense: Expense): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      await db.expenses.update(expense.id, { synced: true })
    } catch (error) {
      console.error('Sync failed:', error)
    }
  }

  getOnlineStatus(): boolean {
    return this.isOnline
  }
}