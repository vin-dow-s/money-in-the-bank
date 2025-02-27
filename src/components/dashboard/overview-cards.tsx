"use client"

import { CreditCard, DollarSign, LineChart, Wallet } from "lucide-react"

import StatCard from "../stat-card"

export const OverviewCards = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Total Balance"
                value={`12345.00$`}
                description="Your total assets across all accounts"
                icon={<DollarSign className="h-4 w-4" />}
                trend={{ value: "+2.5% from last month", isPositive: true }}
            />
            <StatCard
                title="Monthly Budget"
                value={`2300.00$`}
                description="Budget for May 2024"
                icon={<Wallet className="h-4 w-4" />}
                trend={{ value: "$500 remaining", isPositive: true }}
            />
            <StatCard
                title="Investments"
                value={`5678.00$`}
                description="Current portfolio value"
                icon={<LineChart className="h-4 w-4" />}
                trend={{ value: "+5.2% all time", isPositive: true }}
            />
            <StatCard
                title="Monthly Expenses"
                value={`1145.00$`}
                description="Total spent this month"
                icon={<CreditCard className="h-4 w-4" />}
                trend={{ value: "-3.1% from last month", isPositive: true }}
            />
        </div>
    )
}
