export interface CreateRequestDto {
  name: string
  phone: string
  email?: string
  comment?: string
  policyAccepted: boolean
  serviceId?: string
  productId?: string
}

export interface Request {
  id: string
  name: string
  phone: string
  email?: string
  comment?: string
  policyAccepted: boolean
  requestFilePath?: string
  partnerMapPath?: string
  serviceId?: string
  service?: {
    id: string
    title: string
    slug: string
  }
  productId?: string
  product?: {
    id: string
    title: string
    slug: string
  }
  createdAt: string
  updatedAt: string
}

export interface GetRequestsParams {
  page?: number
  limit?: number
  search?: string
  type?: 'all' | 'service' | 'product'
}