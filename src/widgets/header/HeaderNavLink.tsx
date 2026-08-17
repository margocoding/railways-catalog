import type {ReactNode} from "react";
import {NavLink} from "react-router";

interface HeaderNavLinkProps {
    to: string
    children: ReactNode
}

export function HeaderNavLink({
                           to,
                           children,
                       }: HeaderNavLinkProps) {
    return (
        <NavLink
            to={to}
            className={({isActive}) =>
                `
          flex min-h-10 items-center
          rounded-lg px-3
          text-sm font-medium
          transition-colors
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary/50
          ${
                    isActive
                        ? 'bg-muted text-primary'
                        : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                }
        `
            }
        >
            {children}
        </NavLink>
    )
}