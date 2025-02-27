"use client"

import { useWalletStore } from "@/lib/store/wallet-store"
import { cn } from "@/lib/utils"
import { LineChart, TrendingUp, Wallet as WalletIcon } from "lucide-react"
import StatCard from "../stat-card"

export const OverviewCards = () => {
    const { totalValue, totalGain, totalGainPercent } = useWalletStore()

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard
                title="Total Value"
                value={`${totalValue.toFixed(2)}€`}
                description="Current portfolio value"
                icon={<WalletIcon className="h-4 w-4" />}
            />
            <StatCard
                title="Total Gain/Loss"
                value={`${totalGain.toFixed(2)}€`}
                description="Profit or loss on investments"
                icon={<LineChart className="h-4 w-4" />}
                valueClassName={cn(
                    totalGain >= 0 ? "text-green-500" : "text-red-500"
                )}
            />
            <StatCard
                title="ROI"
                value={`${Math.abs(totalGainPercent).toFixed(2)}%`}
                description="Percentage return on investment"
                icon={<TrendingUp className="h-4 w-4" />}
                valueClassName={cn(
                    totalGainPercent >= 0 ? "text-green-500" : "text-red-500"
                )}
            />
        </div>
    )
}

export default OverviewCards
