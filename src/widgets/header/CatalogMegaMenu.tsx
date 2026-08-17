import {useState} from "react";
import {FiChevronRight} from "react-icons/fi";
import {categories, subcategories} from "@/entities/product/model/mockData.ts";
import {Link} from "react-router";
import {getCategoryIcon, getCategoryUrl, getSubcategoryUrl} from "@/shared/lib";

export function CatalogMegaMenu() {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                className="
                    flex min-h-10 items-center gap-2
                    rounded-lg px-3
                    text-sm font-medium
                    text-foreground/80
                    hover:bg-muted
                "
            >
                Каталог
                <FiChevronRight
                    className={`
                        h-4 w-4 transition-transform
                        ${open ? 'rotate-90' : ''}
                    `}
                />
            </button>


            <div
                className={`
                    absolute left-0 top-full pt-3
                    transition-all duration-200
                    ${
                    open
                        ? 'visible opacity-100 translate-y-0'
                        : 'invisible opacity-0 -translate-y-2'
                }
                `}
            >
                <div
                    className="
                        w-[1100px]
                        max-h-[calc(100vh-100px)]
                        overflow-y-auto

                        rounded-xl
                        border border-border
                        bg-card
                        p-6

                        shadow-xl
                    "
                >

                    <div
                        className="
                            grid
                            grid-cols-3
                            gap-6
                        "
                    >
                        {categories.map(category => {

                            const items =
                                subcategories.filter(
                                    item =>
                                        item.categorySlug === category.slug
                                )


                            return (
                                <div
                                    key={category.slug}
                                    className="
                                        group
                                        rounded-xl
                                        border border-border
                                        bg-background
                                        p-4

                                        transition
                                        hover:border-primary/40
                                        hover:shadow-md
                                    "
                                >

                                    <Link
                                        to={getCategoryUrl(category.slug)}
                                        onClick={() => setOpen(false)}
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                            mb-4
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                h-14
                                                w-14
                                                items-center
                                                justify-center

                                                rounded-lg
                                                bg-muted
                                            "
                                        >
                                            {getCategoryIcon(category.id)}
                                        </div>


                                        <h3
                                            className="
                                                text-base
                                                font-bold
                                                text-foreground
                                            "
                                        >
                                            {category.name}
                                        </h3>

                                    </Link>


                                    <div
                                        className="
                                            space-y-1
                                        "
                                    >

                                        {items
                                            .slice(0, 5)
                                            .map(item => (

                                                <Link
                                                    key={item.slug}
                                                    onClick={() => setOpen(false)}
                                                    to={
                                                        getSubcategoryUrl(
                                                            category.slug,
                                                            item.slug
                                                        )
                                                    }
                                                    className="
                                                        block
                                                        text-sm
                                                        text-muted-foreground

                                                        hover:text-primary
                                                    "
                                                >
                                                    {item.name}
                                                </Link>

                                            ))}

                                    </div>


                                    {items.length > 5 && (
                                        <Link
                                            to={getCategoryUrl(category.slug)}
                                            className="
                                                mt-3
                                                inline-flex
                                                text-sm
                                                font-semibold
                                                text-primary
                                            "
                                        >
                                            Все товары →
                                        </Link>
                                    )}

                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}
