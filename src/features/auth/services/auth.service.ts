import { ApiService } from 'src/app/services/api.service'
import type { User } from 'src/shared/types/models'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  access_token: string
  refresh_token: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  confirmPassword: string
}

class AuthService extends ApiService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('/auth/login', credentials)
  }

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>('/auth/register', userData)
  }

  async logout(): Promise<void> {
    return this.post('/auth/logout')
  }

  async refreshToken(): Promise<{ access_token: string }> {
    return this.post('/auth/refresh')
  }
}

export const authService = new AuthService()