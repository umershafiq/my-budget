'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Fingerprint, Shield } from 'lucide-react'
import { AuthService } from '@/lib/auth'
import dynamic from 'next/dynamic'

interface BiometricAuthProps {
  onAuthenticated: () => void
}

export function BiometricAuth({ onAuthenticated }: BiometricAuthProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAuthenticate = async () => {
    setIsAuthenticating(true)
    setError(null)

    try {
      const authService = AuthService.getInstance()
      const success = await authService.authenticateWithBiometrics()
      
      if (success) {
        onAuthenticated()
      } else {
        setError('Authentication failed. Please try again.')
      }
    } catch {
      setError('Biometric authentication is not available on this device.')
    } finally {
      setIsAuthenticating(false)
    }
  }

  useEffect(() => {
    // This runs only on the client
    if (window) {
      // safe to use window
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-sm w-full"
      >
        <div className="text-6xl mb-6">💰</div>
        <h1 className="text-2xl font-bold text-white mb-2">My Budget</h1>
        <p className="text-white/80 mb-8">Secure your expenses with biometric authentication</p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAuthenticate}
          disabled={isAuthenticating}
          className="w-full bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 hover:bg-white/30 disabled:opacity-50"
        >
          {isAuthenticating ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <Fingerprint className="h-5 w-5" />
          )}
          {isAuthenticating ? 'Authenticating...' : 'Authenticate with Biometrics'}
        </motion.button>

        {error && (
          <p className="text-red-300 text-sm mt-4">{error}</p>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 text-white/60 text-sm">
          <Shield className="h-4 w-4" />
          <span>Your data is encrypted and secure</span>
        </div>
      </motion.div>
    </div>
  )
}

export default BiometricAuth