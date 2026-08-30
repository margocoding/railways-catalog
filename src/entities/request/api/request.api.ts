import { baseApi, type PaginatedResponse } from '@/shared/api'
import type { Request, GetRequestsParams, CreateRequestDto } from '../model/types'

export const requestApi = {
  async getAll(params?: GetRequestsParams): Promise<PaginatedResponse<Request>> {
    const { data } = await baseApi.get<PaginatedResponse<Request>>('/request', {
      params,
    })
    return data
  },

  async getById(id: string): Promise<Request> {
    const { data } = await baseApi.get<Request>(`/request/${id}`)
    return data
  },

  async create(dto: CreateRequestDto, files: {
    requestFile?: File | null
    partnerMapFile?: File | null
  }): Promise<void> {
    const formData = new FormData()

    formData.append('name', dto.name)
    formData.append('phone', dto.phone)
    formData.append('policyAccepted', String(dto.policyAccepted))

    if (dto.email) {
      formData.append('email', dto.email)
    }

    if (dto.comment) {
      formData.append('comment', dto.comment)
    }

    if (dto.serviceId) {
      formData.append('serviceId', dto.serviceId)
    }

    if (dto.productId) {
      formData.append('productId', dto.productId)
    }

    if (files.requestFile) {
      formData.append('requestFile', files.requestFile)
    }

    if (files.partnerMapFile) {
      formData.append('partnerMapFile', files.partnerMapFile)
    }

    await baseApi.post('/request', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  async delete(id: string): Promise<void> {
    await baseApi.delete(`/request/${id}`)
  },
}