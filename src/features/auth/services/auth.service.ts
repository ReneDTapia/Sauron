import { ApiService } from 'src/services/api.service'
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

export interface OAuthRedirectResponse {
  success: boolean
  data: {
    redirect_url: string
    state: string
  }
}

export interface OAuthCallbackRequest {
  code: string
  state: string
}

export interface OAuthStatusResponse {
  is_oauth_user: boolean
  oauth_provider: string | null
  has_password: boolean
  has_valid_token: boolean
  can_unlink: boolean
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

  // OAuth methods
  async getOAuthRedirectUrl(provider: 'google' | 'facebook'): Promise<OAuthRedirectResponse> {
    return this.get<OAuthRedirectResponse>(`/auth/oauth/${provider}/redirect`)
  }

  async handleOAuthCallback(provider: 'google' | 'facebook', data: OAuthCallbackRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>(`/auth/oauth/${provider}/callback`, data)
  }

  async getOAuthStatus(): Promise<OAuthStatusResponse> {
    return this.get<OAuthStatusResponse>('/auth/oauth/status')
  }

  async unlinkOAuthProvider(): Promise<void> {
    return this.delete('/auth/oauth/unlink')
  }
}

export const authService = new AuthService()