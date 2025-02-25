"use client"

interface FooterProps {
    className?: string
}

export function Footer({ className }: FooterProps) {
    return (
        <footer className="border-t py-4 px-4 md:px-6">
            <div className="container mx-auto text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Money In The Bank. All rights
                reserved.
            </div>
        </footer>
    )
}
