import { baseApi } from '@/shared/api'
import { removeToken } from '../model/auth.model'

export interface LoginDto {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: Profile
}

export interface Profile {
  id: string
  username: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface ChangePasswordDto {
  currentPassword: string
  newPassword: string
}

export interface ChangeUsernameDto {
  currentPassword: string
  newUsername: string
}

export const authApi = {
  async login(dto: LoginDto): Promise<LoginResponse> {
    const { data } = await baseApi.post<LoginResponse>('/auth/login', dto)
    return data
  },

  async getProfile(): Promise<Profile> {
    const { data } = await baseApi.get<Profile>('/auth/profile')
    return data
  },

  async changePassword(dto: ChangePasswordDto): Promise<Profile> {
    const { data } = await baseApi.post<Profile>('/auth/change-password', dto)
    return data
  },

  async changeUsername(dto: ChangeUsernameDto): Promise<Profile> {
    const { data } = await baseApi.post<Profile>('/auth/change-username', dto)
    return data
  },

  async logout() {
    removeToken();
  }
}