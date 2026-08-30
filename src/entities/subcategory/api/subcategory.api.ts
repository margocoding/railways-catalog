import { baseApi } from '@/shared/api';
import type {
  CreateSubcategoryDto,
  Subcategory,
  UpdateSubcategoryDto
} from '../model/types';

export const subcategoryApi = {
  async getById(id: string): Promise<Subcategory> {
    const { data } = await baseApi.get<Subcategory>(`/product-subcategory/${id}`);
    return data;
  },

  async create(dto: CreateSubcategoryDto): Promise<Subcategory> {
    const { data } = await baseApi.post<Subcategory>('/product-subcategory', dto);
    return data;
  },

  async update(id: string, dto: UpdateSubcategoryDto): Promise<Subcategory> {
    const { data } = await baseApi.put<Subcategory>(`/product-subcategory/${id}`, dto);
    return data;
  },

  async delete(id: string): Promise<void> {
    await baseApi.delete(`/product-subcategory/${id}`);
  },
};