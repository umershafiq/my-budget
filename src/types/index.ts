export interface Expense {
    id: string
    amount: number
    category: string
    description: string
    date: Date
    type: 'expense' | 'income'
    synced: boolean
    createdAt: Date
    updatedAt: Date
  }
  
  export interface User {
    id: string
    email?: string
    isAuthenticated: boolean
    biometricEnabled: boolean
  }
  
  export interface SyncStatus {
    isOnline: boolean
    lastSync: Date | null
    pendingSync: number
  }