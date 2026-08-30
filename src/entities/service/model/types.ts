export interface Service {
  id: string
  slug: string
  title: string
  description: string
  fullDescription?: string
  features: string[]
  image: string
  createdAt: string
  updatedAt: string
}

export interface CreateServiceDto {
  slug: string
  title: string
  description: string
  fullDescription?: string
  features?: string[]
}

export type UpdateServiceDto = Partial<CreateServiceDto>

export interface GetServicesParams {
  page?: number
  limit?: number
  search?: string
  sort?: 'name' | 'newest'
}