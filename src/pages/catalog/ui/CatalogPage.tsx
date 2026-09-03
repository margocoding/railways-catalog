import { useSearchParams } from 'react-router';
import { useCatalog } from '../model/use-catalog';
import { ProductFilter } from '@/features/product-filter/ProductFilter';
import { getCategoryBreadcrumbs } from '@/shared/lib/catalog-helpers';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { CatalogGrid } from '@/widgets/catalog-grid/CatalogGrid';
import { Layout } from '@/widgets/Layout';
import { CatalogSidebar } from '@/widgets/sidebar-catalog/ui/CatalogSidebar';
import { Pagination } from '@/shared/ui/Pagination';

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category') ?? undefined;
  const subcategorySlug = searchParams.get('subcategory') ?? undefined;

  const {
    products,
    currentCategory,
    currentSubcategory,
    filterValue,
    pagination,
    loading,
    error,
    handleFilterChange,
    handlePageChange,
  } = useCatalog();

  const breadcrumbs = getCategoryBreadcrumbs(categorySlug || 'Все', currentCategory?.name || 'Все', currentSubcategory?.slug, currentSubcategory?.name);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-8">
          <h1 className="text-3xl font-black">
            {currentSubcategory?.name ?? currentCategory?.name ?? 'Каталог продукции'}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {loading
              ? 'Загрузка...'
              : error
              ? `Ошибка: ${error}`
              : `Найдено позиций: ${pagination.total}`}
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <CatalogSidebar
            activeCategory={categorySlug}
            activeSubcategory={subcategorySlug}
          />

          <div className="min-w-0 flex-1">
            <ProductFilter
              value={filterValue}
              onFilterChange={handleFilterChange}
            />

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : (
              <>
                <CatalogGrid products={products} />
                {pagination.totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={pagination.page}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}