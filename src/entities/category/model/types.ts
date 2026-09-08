import type { Subcategory } from "@/entities/subcategory";

export interface FilterOptionValue {
  value: string;
  label: string;
}

export interface FilterOption {
  key: string;
  label: string;
  type?: 'select' | 'range';
  options?: FilterOptionValue[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount?: number;
  subcategories: Subcategory[];
  filters?: FilterOption[];
}

export interface CreateCategoryDto {
  name: string;
  slug: string;
  description: string;
  filters?: FilterOption[];
}

export interface UpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
  filters?: FilterOption[];
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
}
