import Dexie, { Table } from 'dexie'
import { Expense, User } from '@/types'

export class MyBudgetDB extends Dexie {
  expenses!: Table<Expense>
  users!: Table<User>

  constructor() {
    super('MyBudgetDB')
    this.version(1).stores({
      expenses: '++id, amount, category, type, date, synced',
      users: '++id, email, isAuthenticated, biometricEnabled'
    })
  }
}

export const db = new MyBudgetDB()