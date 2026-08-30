import { baseApi, type PaginatedResponse } from '@/shared/api'
import type {
  Service,
  CreateServiceDto,
  UpdateServiceDto,
  GetServicesParams,
} from '../model/types'

export const serviceApi = {
  async getAll(params?: GetServicesParams): Promise<PaginatedResponse<Service>> {
    const { data } = await baseApi.get<PaginatedResponse<Service>>('/service', {
      params,
    })
    return data
  },

  async getBySlug(slug: string): Promise<Service> {
    const { data } = await baseApi.get<Service>(`/service/${slug}`)
    return data
  },

  async create(dto: CreateServiceDto, image?: File | null): Promise<Service> {
    const formData = new FormData()

    formData.append('slug', dto.slug)
    formData.append('title', dto.title)
    formData.append('description', dto.description)

    if (dto.fullDescription) {
      formData.append('fullDescription', dto.fullDescription)
    }

    if (dto.features && dto.features.length > 0) {
      formData.append('features', JSON.stringify(dto.features))
    }

    if (image) {
      formData.append('image', image)
    }

    const { data } = await baseApi.post<Service>('/service', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },

  async update(id: string, dto: UpdateServiceDto, image?: File | null): Promise<Service> {
    const formData = new FormData()

    if (dto.slug) formData.append('slug', dto.slug)
    if (dto.title) formData.append('title', dto.title)
    if (dto.description) formData.append('description', dto.description)
    if (dto.fullDescription) formData.append('fullDescription', dto.fullDescription)

    if (dto.features && dto.features.length > 0) {
      formData.append('features', JSON.stringify(dto.features))
    }

    if (image) {
      formData.append('image', image)
    }

    const { data } = await baseApi.put<Service>(`/service/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },

  async delete(id: string): Promise<void> {
    await baseApi.delete(`/service/${id}`)
  },
}