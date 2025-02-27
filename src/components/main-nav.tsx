"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface MainNavProps {
    className?: string
}

export const MainNav = ({ className }: MainNavProps) => {
    const pathname = usePathname()

    const routes = [
        {
            href: "/",
            label: "Dashboard",
            active: pathname === "/",
        },
        {
            href: "/budget",
            label: "Budget",
            active: pathname === "/budget",
        },
        {
            href: "/wallet",
            label: "Wallet",
            active: pathname === "/wallet",
        },
        {
            href: "/investments",
            label: "Investments",
            active: pathname === "/investments",
        },
        {
            href: "/simulations",
            label: "Simulations",
            active: pathname === "/simulations",
        },
    ]

    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}
