"use client"

import { DollarSign, LineChart, TrendingUp } from "lucide-react"
import StatCard from "../stat-card"

// Mock portfolio data for demonstration
const portfolioData = [
    { name: "Stocks", value: 3500, color: "#10b981" },
    { name: "ETFs", value: 2000, color: "#3b82f6" },
    { name: "Bonds", value: 1000, color: "#f59e0b" },
    { name: "Cash", value: 500, color: "#6b7280" },
]

export const OverviewCards = () => {
    const totalPortfolioValue = portfolioData.reduce(
        (sum, item) => sum + item.value,
        0
    )

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard
                title="Total Portfolio Value"
                value={`${totalPortfolioValue.toFixed(2)}$`}
                description="Updated just now"
                icon={<DollarSign className="h-4 w-4" />}
            />
            <StatCard
                title="Monthly Return"
                value={`500.00$`}
                description="Last 30 days"
                icon={<LineChart className="h-4 w-4" />}
                valueClassName="text-green-500"
                prefix={<span className="mr-1">+</span>}
            />
            <StatCard
                title="YTD Return"
                value={`2000.00$`}
                description="Since Jan 1, 2024"
                icon={<TrendingUp className="h-4 w-4" />}
                valueClassName="text-green-500"
                prefix={<span className="mr-1">+</span>}
            />
        </div>
    )
}

export default OverviewCards
