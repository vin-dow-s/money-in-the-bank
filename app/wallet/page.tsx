import { OverviewCards } from "@/components/wallet/overview-cards"
import { Wallet } from "@/components/wallet/wallet"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Wallet | MiTB",
    description: "Manage your stock and ETF portfolio",
}

const WalletPage = () => {
    return (
        <div className="flex flex-col gap-4 py-6">
            <div className="mb-3">
                <h1 className="text-3xl font-bold">Portfolio</h1>
            </div>

            <OverviewCards />

            <div className="grid gap-6">
                <Wallet />
            </div>
        </div>
    )
}

export default WalletPage
