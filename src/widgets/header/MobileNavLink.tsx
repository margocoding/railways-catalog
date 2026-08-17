import {NavLink} from "react-router";
import type {ReactNode} from "react";

interface MobileNavLinkProps {
    to: string
    children: ReactNode
    onClick: () => void
}

export function MobileNavLink({
                           to,
                           children,
                           onClick,
                       }: MobileNavLinkProps) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({isActive}) =>
                `
          flex min-h-12 items-center
          rounded-lg px-3
          text-base font-semibold
          transition-colors
          ${
                    isActive
                        ? 'bg-muted text-primary'
                        : 'hover:bg-muted'
                }
        `
            }
        >
            {children}
        </NavLink>
    )
}