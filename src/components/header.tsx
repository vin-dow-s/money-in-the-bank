"use client"

import { Settings } from "lucide-react"
import Link from "next/link"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface HeaderProps {
    className?: string
}

export const Header = ({ className }: HeaderProps) => {
    return (
        <header className={cn("border-b", className)}>
            <div className="flex h-16 items-center px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 mr-4">
                    <Image
                        src="/MITB.png"
                        alt="Money In The Bank"
                        width={45}
                        height={42}
                    />
                </Link>
                <MainNav className="flex-1 flex justify-center" />

                <div className="ml-auto flex items-center space-x-4">
                    <Link href="/settings">
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Settings className="h-5 w-5 text-muted-foreground" />
                            <span className="sr-only">Settings</span>
                        </Button>
                    </Link>
                    <Button variant="cta">Login</Button>
                </div>
            </div>
        </header>
    )
}
