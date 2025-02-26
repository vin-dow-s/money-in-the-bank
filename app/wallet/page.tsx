import { Wallet } from "@/components/wallet/wallet"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Wallet | MiTB",
    description: "Manage your stock and ETF portfolio",
}

export default function WalletPage() {
    return (
        <main className="container py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Portfolio</h1>
                <p className="text-muted-foreground">
                    Track your investments and monitor their performance
                </p>
            </div>

            <div className="grid gap-6">
                <Wallet />
            </div>
        </main>
    )
}
