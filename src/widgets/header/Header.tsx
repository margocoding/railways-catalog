import { useEffect, useState } from 'react'
import { FiMenu, FiPhone, FiSearch, FiShoppingCart, FiMail } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { Button } from '../../shared/ui/Button'
import { MobileMenu } from "@/widgets/header/MobileMenu.tsx";
import { CatalogMegaMenu } from "@/widgets/header/CatalogMegaMenu.tsx";
import { HeaderNavLink } from "@/widgets/header/HeaderNavLink.tsx";
import { useCart } from "@/entities/cart/model/use-cart";
import { RequestFormModal } from "../../shared/ui/RequestFormModal";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [requestFormOpen, setRequestFormOpen] = useState(false)
    const { totalItems } = useCart()
    const navigate = useNavigate()

    // Обработчик глобального события для открытия формы заявки
    useEffect(() => {
        const handleOpenRequestForm = () => {
            setRequestFormOpen(true)
        }

        window.addEventListener('open-request-form', handleOpenRequestForm)

        return () => {
            window.removeEventListener('open-request-form', handleOpenRequestForm)
        }
    }, [])

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-10">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex shrink-0 items-center gap-3"
                    aria-label="СтальПуть — главная"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-gradient">
            <span className="text-xl" aria-hidden="true">
              🛤️
            </span>
                    </div>

                    <div className="hidden sm:block">
                        <div className="text-lg font-black leading-none text-foreground">
                            СтальПуть
                        </div>

                        <div className="mt-1 text-xs text-muted-foreground">
                            Материалы ВСП
                        </div>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav
                    className="hidden items-center gap-1 lg:flex"
                    aria-label="Основная навигация"
                >
                    <CatalogMegaMenu/>

                    <HeaderNavLink to="/services">
                        Услуги
                    </HeaderNavLink>

                    <HeaderNavLink to="/delivery">
                        Доставка
                    </HeaderNavLink>

                    <HeaderNavLink to="/price">
                        Прайс
                    </HeaderNavLink>

                    <HeaderNavLink to="/about">
                        О компании
                    </HeaderNavLink>

                    <HeaderNavLink to="/contacts">
                        Контакты
                    </HeaderNavLink>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-2 md:flex lg:gap-3">
                    <button
                        type="button"
                        className="
              flex h-10 w-10 items-center justify-center
              rounded-lg
              text-muted-foreground
              transition-colors
              hover:bg-muted
              hover:text-foreground
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary/50
            "
                        aria-label="Поиск"
                    >
                        <FiSearch className="h-5 w-5"/>
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/cart')}
                        className="
              relative
              flex h-10 w-10 items-center justify-center
              rounded-lg
              text-muted-foreground
              transition-colors
              hover:bg-muted
              hover:text-foreground
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary/50
            "
                        aria-label="Корзина"
                    >
                        <FiShoppingCart className="h-5 w-5"/>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                                {totalItems > 9 ? '9+' : totalItems}
                            </span>
                        )}
                    </button>

                    <a
                        href="tel:+78432597300"
                        className="
              hidden items-center gap-2
              px-2
              text-sm font-semibold
              text-foreground
              transition-colors
              hover:text-primary
              xl:flex
            "
                    >
                        <FiPhone className="h-4 w-4 text-primary"/>
                        <span>+7 (843) 259-73-00</span>
                    </a>

                    <a
                        href="mailto:zakaz@ttr2.ru"
                        className="
              hidden items-center gap-2
              px-2
              text-sm font-semibold
              text-foreground
              transition-colors
              hover:text-primary
              xl:flex
            "
                        aria-label="Email"
                    >
                        <FiMail className="h-4 w-4 text-primary"/>
                        <span>zakaz@ttr2.ru</span>
                    </a>

                    <Button onClick={() => setRequestFormOpen(true)}>
                        Получить КП
                    </Button>
                </div>

                {/* Mobile Actions */}
                <div className="flex items-center gap-1 md:hidden">
                    <button
                        type="button"
                        className="
              flex h-10 w-10 items-center justify-center
              rounded-lg
              text-muted-foreground
              transition-colors
              hover:bg-muted
              hover:text-foreground
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary/50
            "
                        aria-label="Поиск"
                    >
                        <FiSearch className="h-5 w-5"/>
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/cart')}
                        className="
              flex h-10 w-10 items-center justify-center
              rounded-lg
              text-foreground
              transition-colors
              hover:bg-muted
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary/50
            "
                        aria-label="Корзина"
                    >
                        <FiShoppingCart className="h-5 w-5"/>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                                {totalItems > 9 ? '9+' : totalItems}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        className="
              flex h-10 w-10 items-center justify-center
              rounded-lg
              text-foreground
              transition-colors
              hover:bg-muted
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary/50
            "
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Открыть меню"
                    >
                        <FiMenu className="h-6 w-6"/>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <MobileMenu
                open={mobileMenuOpen}
                onOpenChange={setMobileMenuOpen}
            />

            {/* Request Form Modal */}
            <RequestFormModal
                open={requestFormOpen}
                onOpenChange={setRequestFormOpen}
            />
        </header>
    )
}