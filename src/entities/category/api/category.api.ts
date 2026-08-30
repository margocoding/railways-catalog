// src/entities/category/api/category-api.ts
import { baseApi, type PaginatedResponse } from '@/shared/api';
import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  GetCategoriesParams,
} from '../model/types';

export const categoryApi = {
  async getAll(params?: GetCategoriesParams): Promise<PaginatedResponse<Category>> {
    const { data } = await baseApi.get<PaginatedResponse<Category>>('/product-category', {
      params,
    });
    return data;
  },

  async getById(id: string): Promise<Category> {
    const { data } = await baseApi.get<Category>(`/product-category/${id}`);
    return data;
  },

  async create(dto: CreateCategoryDto, image?: File | null): Promise<Category> {
    const formData = new FormData();

    formData.append('name', dto.name);
    formData.append('slug', dto.slug);
    formData.append('description', dto.description);

    if (dto.filters) {
      formData.append('filters', JSON.stringify(dto.filters));
    }

    if (image) {
      formData.append('image', image);
    }

    const { data } = await baseApi.post<Category>('/product-category', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async update(id: string, dto: UpdateCategoryDto, image?: File | null): Promise<Category> {
    const formData = new FormData();

    if (dto.name) formData.append('name', dto.name);
    if (dto.slug) formData.append('slug', dto.slug);
    if (dto.description) formData.append('description', dto.description);
    if (dto.filters) formData.append('filters', JSON.stringify(dto.filters));

    if (image) {
      formData.append('image', image);
    }

    const { data } = await baseApi.put<Category>(`/product-category/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async delete(id: string): Promise<void> {
    await baseApi.delete(`/product-category/${id}`);
  },
};