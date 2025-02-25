"use client"

import {
    ArrowDown,
    ArrowUp,
    CreditCard,
    DollarSign,
    LineChart,
    Wallet,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
    title: string
    value: string
    description: string
    icon: React.ReactNode
    trend?: {
        value: string
        isPositive: boolean
    }
    className?: string
}

function StatCard({
    title,
    value,
    description,
    icon,
    trend,
    className,
}: StatCardProps) {
    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
            {trend && (
                <CardFooter className="p-2">
                    <div
                        className={cn(
                            "flex items-center text-xs",
                            trend.isPositive ? "text-green-500" : "text-red-500"
                        )}
                    >
                        {trend.isPositive ? (
                            <ArrowUp className="mr-1 h-3 w-3" />
                        ) : (
                            <ArrowDown className="mr-1 h-3 w-3" />
                        )}
                        <span>{trend.value}</span>
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}

export function OverviewCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
                title="Total Balance"
                value="$12,345.67"
                description="Your total assets across all accounts"
                icon={<DollarSign className="h-4 w-4" />}
                trend={{ value: "+2.5% from last month", isPositive: true }}
            />
            <StatCard
                title="Monthly Budget"
                value="$3,500.00"
                description="Budget for May 2024"
                icon={<Wallet className="h-4 w-4" />}
                trend={{ value: "$500 remaining", isPositive: true }}
            />
            <StatCard
                title="Investments"
                value="$5,678.90"
                description="Current portfolio value"
                icon={<LineChart className="h-4 w-4" />}
                trend={{ value: "+5.2% all time", isPositive: true }}
            />
            <StatCard
                title="Monthly Expenses"
                value="$2,345.67"
                description="Total spent this month"
                icon={<CreditCard className="h-4 w-4" />}
                trend={{ value: "-3.1% from last month", isPositive: true }}
            />
        </div>
    )
}
