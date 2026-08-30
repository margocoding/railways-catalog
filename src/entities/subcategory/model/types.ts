import type { FilterOption } from '@/entities/category';

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categorySlug: string;
  filters?: FilterOption[];
}

export interface CreateSubcategoryDto {
  name: string;
  slug: string;
  categorySlug: string;
  filters?: FilterOption[];
}

export type UpdateSubcategoryDto = Partial<CreateSubcategoryDto>;

export interface GetSubcategoriesParams {
  page?: number;
  limit?: number;
}