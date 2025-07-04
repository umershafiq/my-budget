export class AuthService {
  private static instance: AuthService
  private isAuthenticated = false

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async authenticateWithBiometrics(): Promise<boolean> {
    try {
      if (!window.PublicKeyCredential) {
        throw new Error('WebAuthn not supported')
      }

      const options = {
        challenge: new Uint8Array(32),
        rp: {
          name: 'My Budget',
          id: window.location.hostname,
        },
        user: {
          id: new Uint8Array(16),
          name: 'user@mybudget.app',
          displayName: 'Budget User',
        },
        pubKeyCredParams: [{ alg: -7, type: 'public-key' as const }],
        timeout: 60000,
        attestation: 'direct' as const,
      }

      const credential = await navigator.credentials.create({
        publicKey: options,
      })

      if (credential) {
        this.isAuthenticated = true
        localStorage.setItem('auth_status', 'true')
        return true
      }
      return false
    } catch (error) {
      console.error('Biometric auth failed:', error)
      return false
    }
  }

  async verifyBiometrics(): Promise<boolean> {
    try {
      const options = {
        challenge: new Uint8Array(32),
        allowCredentials: [],
        timeout: 60000,
      }

      const credential = await navigator.credentials.get({
        publicKey: options,
      })

      if (credential) {
        this.isAuthenticated = true
        return true
      }
      return false
    } catch (error) {
      console.error('Biometric verification failed:', error)
      return false
    }
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated || localStorage.getItem('auth_status') === 'true'
  }

  logout(): void {
    this.isAuthenticated = false
    localStorage.removeItem('auth_status')
  }
}