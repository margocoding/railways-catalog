import { baseApi, type PaginatedResponse } from '@/shared/api';
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
  GetProductsParams,
} from '../model/types';

export interface ProductDetailed extends Product {
  category?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
  };
  subcategory?: {
    id: string;
    name: string;
    slug: string;
    categoryId: string;
    categorySlug: string;
  };
  similarProducts?: Product[];
}

export const productApi = {
  async getAll(params?: GetProductsParams): Promise<PaginatedResponse<Product>> {
    const queryParams: Record<string, any> = {
      page: params?.page,
      limit: params?.limit,
      categorySlug: params?.category,
      subcategorySlug: params?.subcategory,
      search: params?.search,
      gost: params?.gost,
      priceMin: params?.priceMin,
      priceMax: params?.priceMax,
      sort: params?.sort,
      condition: params?.condition !== 'all' ? params?.condition : undefined,
      stock: params?.stock !== 'all' ? params?.stock : undefined,
    };

    if (params?.attributes) {
      Object.entries(params.attributes).forEach(([key, value]) => {
        if (value && value !== 'all') {
          queryParams[`attribute_${key}`] = value;
        }
      });
    }

    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key] === undefined) {
        delete queryParams[key];
      }
    });

    const { data } = await baseApi.get<PaginatedResponse<Product>>('/product', {
      params: queryParams,
    });
    return data;
  },

  async getBySlug(slug: string): Promise<ProductDetailed> {
    const { data } = await baseApi.get<ProductDetailed>(`/product/${slug}`);
    return data;
  },

  async create(dto: CreateProductDto, images: File[] = []): Promise<Product> {
    const formData = new FormData();

    formData.append('sku', dto.sku);
    formData.append('title', dto.title);
    formData.append('slug', dto.slug);
    formData.append('gost', dto.gost);
    formData.append('price', String(dto.price));
    formData.append('stock', String(dto.stock));
    formData.append('condition', dto.condition);
    formData.append('categorySlug', dto.categorySlug);

    if (dto.subcategorySlug) {
      formData.append('subcategorySlug', dto.subcategorySlug);
    }

    if (dto.description) {
      formData.append('description', dto.description);
    }

    if (dto.specs && dto.specs.length > 0) {
      formData.append('specs', JSON.stringify(dto.specs));
    }

    if (dto.analogues && dto.analogues.length > 0) {
      formData.append('analogues', JSON.stringify(dto.analogues));
    }

    images.forEach((image) => {
      formData.append('images', image);
    });

    const { data } = await baseApi.post<Product>('/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async update(
    id: string,
    dto: UpdateProductDto,
    newImages: File[] = [],
    existingImages: string[] = [],
  ): Promise<Product> {
    const formData = new FormData();

    if (dto.sku !== undefined) formData.append('sku', dto.sku);
    if (dto.title !== undefined) formData.append('title', dto.title);
    if (dto.slug !== undefined) formData.append('slug', dto.slug);
    if (dto.gost !== undefined) formData.append('gost', dto.gost);
    if (dto.price !== undefined) formData.append('price', String(dto.price));
    if (dto.stock !== undefined) formData.append('stock', String(dto.stock));
    if (dto.condition !== undefined) formData.append('condition', dto.condition);
    if (dto.categorySlug !== undefined) formData.append('categorySlug', dto.categorySlug);
    if (dto.subcategorySlug !== undefined) formData.append('subcategorySlug', dto.subcategorySlug);
    if (dto.description !== undefined) formData.append('description', dto.description);
    if (dto.specs !== undefined) formData.append('specs', JSON.stringify(dto.specs));
    if (dto.analogues !== undefined) formData.append('analogues', JSON.stringify(dto.analogues));

    existingImages.forEach((img) => {
      formData.append('images', img);
    });

    newImages.forEach((image) => {
      formData.append('images', image);
    });

    const { data } = await baseApi.put<Product>(`/product/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async delete(id: string): Promise<void> {
    await baseApi.delete(`/product/${id}`);
  },
};
