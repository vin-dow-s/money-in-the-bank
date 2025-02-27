import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { mainFont } from "@/lib/fonts"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "Money In The Bank | Personal Finance",
    description:
        "Track your finances, manage budgets, and monitor investments in one place",
}

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${mainFont.variable} dark`}
        >
            <body className={`antialiased min-h-screen bg-background`}>
                <div className="flex min-h-screen flex-col">
                    <Header />
                    <main className="flex-1 p-4 md:p-6">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    )
}

export default RootLayout
