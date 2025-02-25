import { Footer } from "@/components/dashboard/footer"
import { Header } from "@/components/dashboard/header"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6">{children}</main>
            <Footer />
        </div>
    )
}
