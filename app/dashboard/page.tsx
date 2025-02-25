import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { StockMarket } from "@/components/dashboard/stock-market"

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's an overview of your finances.
                </p>
            </div>
            <OverviewCards />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <ExpenseChart />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StockMarket />
            </div>
        </div>
    )
}
