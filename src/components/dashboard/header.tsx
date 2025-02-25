"use client"

import { DollarSign } from "lucide-react"
import Link from "next/link"

import { MainNav } from "@/components/dashboard/main-nav"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

interface HeaderProps {
    className?: string
}

export function Header({ className }: HeaderProps) {
    return (
        <header className={cn("border-b", className)}>
            <div className="flex h-16 items-center px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 mr-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl hidden md:inline-block">
                        Money In The Bank
                    </span>
                </Link>
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
