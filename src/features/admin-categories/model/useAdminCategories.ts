import { categoryApi, type Category } from '@/entities/category';
import { type Subcategory } from '@/entities/subcategory';
import { useCallback, useEffect, useState } from 'react';

export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await categoryApi.getAll({ limit: 100 });
      setCategories(response.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (
    dto: { name: string; slug: string; description: string },
    image?: File | null,
  ): Promise<Category | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const newCategory = await categoryApi.create(dto, image);
      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (id: string, updates: Partial<Category>, image?: File | null): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedCategory = await categoryApi.update(id, updates, image);
      setCategories((prev) => prev.map((cat) => (cat.id === id ? updatedCategory : cat)));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await categoryApi.delete(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setSubcategories((prev) => prev.filter((sub) => sub.categoryId !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
    subcategories,
    isLoading,
    error,
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}