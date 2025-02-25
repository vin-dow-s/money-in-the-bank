"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface MainNavProps {
    className?: string
}

export function MainNav({ className }: MainNavProps) {
    const pathname = usePathname()

    const routes = [
        {
            href: "/",
            label: "Dashboard",
            active: pathname === "/dashboard",
        },
        {
            href: "/budget",
            label: "Budget",
            active: pathname === "/budget",
        },
        {
            href: "/investments",
            label: "Investments",
            active: pathname === "/investments",
        },
        {
            href: "/settings",
            label: "Settings",
            active: pathname === "/settings",
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
