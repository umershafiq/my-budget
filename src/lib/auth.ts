export class AuthService {
  private static instance: AuthService
  private isAuthenticated = false

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated || localStorage.getItem('auth_status') === 'true'
  }

  logout(): void {
    this.isAuthenticated = false
    localStorage.removeItem('auth_status')
  }
}