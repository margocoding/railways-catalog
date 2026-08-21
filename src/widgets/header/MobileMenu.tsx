import {useState} from "react";
import {categories, subcategories} from "@/entities/product/model/mockData.ts";
import {Drawer} from "@/shared/ui/Drawer.tsx";
import {FiChevronLeft, FiChevronRight, FiPhone} from "react-icons/fi";
import {Link} from "react-router";
import {getCategoryUrl, getSubcategoryUrl} from "@/shared/lib";
import {MobileNavLink} from "@/widgets/header/MobileNavLink.tsx";
import {Button} from "@/shared/ui/Button.tsx";

interface MobileMenuProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function MobileMenu({
                        open,
                        onOpenChange,
                    }: MobileMenuProps) {
    const [catalogOpen, setCatalogOpen] = useState(false)

    const [activeCategorySlug, setActiveCategorySlug] =
        useState<string | null>(null)

    const selectedCategory = categories.find(
        (category) => category.slug === activeCategorySlug,
    )

    const selectedSubcategories = selectedCategory
        ? subcategories.filter(
            (subcategory) =>
                subcategory.categorySlug === selectedCategory.slug,
        )
        : []

    const closeMenu = () => {
        onOpenChange(false)

        window.setTimeout(() => {
            setCatalogOpen(false)
            setActiveCategorySlug(null)
        }, 200)
    }

    const handleDrawerChange = (value: boolean) => {
        onOpenChange(value)

        if (!value) {
            setCatalogOpen(false)
            setActiveCategorySlug(null)
        }
    }

    return (
        <Drawer
            open={open}
            onOpenChange={handleDrawerChange}
            title={catalogOpen ? 'Каталог' : 'Меню'}
            side="right"
        >
            <div className="flex h-full min-h-0 flex-col">
                {catalogOpen ? (
                    <>
                        {/* Back */}
                        <button
                            type="button"
                            className="
                mb-3 flex min-h-10 shrink-0 items-center gap-2
                rounded-lg px-2
                text-sm font-semibold
                text-muted-foreground
                transition-colors
                hover:bg-muted
                hover:text-foreground
              "
                            onClick={() => {
                                if (selectedCategory) {
                                    setActiveCategorySlug(null)
                                } else {
                                    setCatalogOpen(false)
                                }
                            }}
                        >
                            <FiChevronLeft className="h-5 w-5"/>
                            Назад
                        </button>

                        {/* Selected category */}
                        {selectedCategory ? (
                            <>
                                <div className="mb-5 flex shrink-0 items-center gap-3 rounded-lg bg-muted p-4">
                                    <div>
                                        <div className="font-bold">
                                            {selectedCategory.name}
                                        </div>

                                        <div className="mt-0.5 text-xs text-muted-foreground">
                                            {selectedSubcategories.length} подкатегорий
                                        </div>
                                    </div>
                                </div>

                                {/* Scrollable subcategories */}
                                <div className="min-h-0 flex-1 overflow-y-auto">
                                    <div className="space-y-1 pr-1">
                                        {selectedSubcategories.map(
                                            (subcategory) => (
                                                <Link
                                                    key={subcategory.slug}
                                                    to={getSubcategoryUrl(
                                                        selectedCategory.slug,
                                                        subcategory.slug,
                                                    )}
                                                    className="
                            flex min-h-11 items-center
                            rounded-lg px-3
                            text-sm font-medium
                            transition-colors
                            hover:bg-muted
                          "
                                                    onClick={closeMenu}
                                                >
                          <span className="flex-1">
                            {subcategory.name}
                          </span>

                                                    <FiChevronRight className="h-4 w-4 text-muted-foreground"/>
                                                </Link>
                                            ),
                                        )}
                                    </div>
                                </div>

                                {/* Category footer */}
                                <Link
                                    to={getCategoryUrl(
                                        selectedCategory.slug,
                                    )}
                                    className="
                    mt-4 flex min-h-11 shrink-0 items-center
                    rounded-lg bg-muted px-3
                    text-sm font-semibold text-primary
                  "
                                    onClick={closeMenu}
                                >
                                    Все товары категории

                                    <FiChevronRight className="ml-auto h-4 w-4"/>
                                </Link>
                            </>
                        ) : (
                            <>
                                <div
                                    className="mb-3 shrink-0 px-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Категории
                                </div>

                                {/* Scrollable categories */}
                                <div className="min-h-0 flex-1 overflow-y-auto">
                                    <div className="space-y-1 pr-1">
                                        {categories.map((category) => {
                                            const categorySubcategories =
                                                subcategories.filter(
                                                    (subcategory) =>
                                                        subcategory.categorySlug ===
                                                        category.slug,
                                                )

                                            return (
                                                <button
                                                    key={category.slug}
                                                    type="button"
                                                    className="
                            flex min-h-12 w-full items-center
                            gap-3 rounded-lg px-3
                            text-left
                            transition-colors
                            hover:bg-muted
                          "
                                                    onClick={() =>
                                                        setActiveCategorySlug(
                                                            category.slug,
                                                        )
                                                    }
                                                >
                          <span className="flex-1">
                            <span className="block text-sm font-semibold">
                              {category.name}
                            </span>

                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {categorySubcategories.length}{' '}
                                подкатегорий
                            </span>
                          </span>

                                                    <FiChevronRight className="h-4 w-4 text-muted-foreground"/>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Catalog footer */}
                                <Link
                                    to="/catalog"
                                    className="
                    mt-3 flex min-h-11 shrink-0 items-center
                    rounded-lg bg-muted px-3
                    text-sm font-semibold text-primary
                  "
                                    onClick={closeMenu}
                                >
                                    Весь каталог

                                    <FiChevronRight className="ml-auto h-4 w-4"/>
                                </Link>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {/* Navigation */}
                        <div className="space-y-1">
                            <button
                                type="button"
                                className="
                  flex min-h-12 w-full items-center
                  rounded-lg px-3
                  text-left
                  text-base font-semibold
                  transition-colors
                  hover:bg-muted
                "
                                onClick={() => setCatalogOpen(true)}
                            >
                <span className="flex-1">
                  Каталог
                </span>

                                <FiChevronRight className="h-5 w-5 text-muted-foreground"/>
                            </button>

                            <MobileNavLink
                                to="/services"
                                onClick={closeMenu}
                            >
                                Услуги
                            </MobileNavLink>

                            <MobileNavLink
                                to="/delivery"
                                onClick={closeMenu}
                            >
                                Доставка
                            </MobileNavLink>

                            <MobileNavLink
                                to="/price"
                                onClick={closeMenu}
                            >
                                Прайс
                            </MobileNavLink>

                            <MobileNavLink
                                to="/about"
                                onClick={closeMenu}
                            >
                                О компании
                            </MobileNavLink>

                            <MobileNavLink
                                to="/contacts"
                                onClick={closeMenu}
                            >
                                Контакты
                            </MobileNavLink>
                        </div>

                        {/* Contact */}
                        <div className="mt-auto border-t border-border pt-5">
                            <a
                                href="tel:+78432597300"
                                className="
                  mb-3 flex min-h-12 items-center
                  gap-3 rounded-lg
                  bg-muted px-4
                  text-sm font-semibold
                "
                            >
                                <FiPhone className="h-5 w-5 text-primary"/>

                                <div>
                                    <div>+7 (843) 259-73-00</div>

                                    <div className="mt-0.5 text-xs font-normal text-muted-foreground">
                                        Бесплатно по России
                                    </div>
                                </div>
                            </a>

                            <Link
                                to="/contacts"
                                onClick={closeMenu}
                            >
                                <Button className="w-full">
                                    Получить КП
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </Drawer>
    )
}