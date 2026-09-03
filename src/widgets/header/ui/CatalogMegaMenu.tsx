import { getCategoryUrl, getSubcategoryUrl } from "@/shared/lib";
import { useState } from "react";
import { FiChevronRight, FiImage } from "react-icons/fi";
import { Link } from "react-router";
import { useCatalogMegaMenu } from "../model/use-catalog-mega-menu";
import { getImageUrl } from "@/shared/lib/product-helpers";

export function CatalogMegaMenu() {
  const [open, setOpen] = useState(false);
  const { categories, loading, error } = useCatalogMegaMenu();

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-foreground/80 hover:bg-muted">
        Каталог
        <FiChevronRight
          className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>

      <div
        className={`absolute left-0 top-full pt-3 transition-all duration-200 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="w-275 max-h-[calc(100vh-100px)] overflow-y-auto rounded-xl border border-border bg-card p-6 shadow-xl">
          {loading ? (
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-background p-4"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-14 w-14 animate-pulse rounded-lg bg-muted" />
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="h-3 w-3/4 animate-pulse rounded bg-muted"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Ошибка загрузки каталога
            </div>
          ) : categories.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Каталог пуст
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {categories.map((category) => {
                const items = category.subcategories || [];

                return (
                  <div
                    key={category.slug}
                    className="group rounded-xl border border-border bg-background p-4 transition hover:border-primary/40 hover:shadow-md"
                  >
                    <Link
                      to={getCategoryUrl(category.slug)}
                      onClick={() => setOpen(false)}
                      className="mb-4 flex items-center gap-4"
                    >
                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg bg-muted">
                        {category.image ? (
                          <img
                            src={getImageUrl(category.image)}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FiImage />
                        )}
                      </div>

                      <h3 className="text-base font-bold text-foreground">
                        {category.name}
                      </h3>
                    </Link>

                    <div className="space-y-1">
                      {items.slice(0, 5).map((item) => (
                        <Link
                          key={item.slug}
                          onClick={() => setOpen(false)}
                          to={getSubcategoryUrl(category.slug, item.slug)}
                          className="block text-sm text-muted-foreground hover:text-primary"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    {items.length > 5 && (
                      <Link
                        to={getCategoryUrl(category.slug)}
                        className="mt-3 inline-flex text-sm font-semibold text-primary"
                      >
                        Все товары →
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
