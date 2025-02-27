import { Plus } from "lucide-react"

import { OverviewCards } from "@/components/investments/overview-cards"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// Mock portfolio data
const portfolioData = [
    { name: "Stocks", value: 3500, color: "#10b981" },
    { name: "ETFs", value: 2000, color: "#3b82f6" },
    { name: "Bonds", value: 1000, color: "#f59e0b" },
    { name: "Cash", value: 500, color: "#6b7280" },
]

// Mock performance data
const performanceData = [
    { date: "2023-06", value: 5000 },
    { date: "2023-07", value: 5200 },
    { date: "2023-08", value: 5100 },
    { date: "2023-09", value: 5300 },
    { date: "2023-10", value: 5500 },
    { date: "2023-11", value: 5400 },
    { date: "2023-12", value: 5600 },
    { date: "2024-01", value: 5800 },
    { date: "2024-02", value: 6000 },
    { date: "2024-03", value: 6200 },
    { date: "2024-04", value: 6500 },
    { date: "2024-05", value: 7000 },
]

// Mock holdings data
const holdingsData = [
    {
        symbol: "VTI",
        name: "Vanguard Total Stock Market ETF",
        shares: 10,
        price: 252.67,
        value: 2526.7,
        allocation: 35.8,
    },
    {
        symbol: "VOO",
        name: "Vanguard S&P 500 ETF",
        shares: 4,
        price: 462.18,
        value: 1848.72,
        allocation: 26.2,
    },
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        shares: 5,
        price: 169.3,
        value: 846.5,
        allocation: 12.0,
    },
    {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        shares: 2,
        price: 417.88,
        value: 835.76,
        allocation: 11.8,
    },
    {
        symbol: "BND",
        name: "Vanguard Total Bond Market ETF",
        shares: 10,
        price: 72.54,
        value: 725.4,
        allocation: 10.3,
    },
    {
        symbol: "CASH",
        name: "Cash",
        shares: null,
        price: null,
        value: 275.0,
        allocation: 3.9,
    },
]

const InvestmentsPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Investments
                    </h1>
                    <p className="text-muted-foreground">
                        Track your investment portfolio and performance
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Investment
                </Button>
            </div>

            <OverviewCards />

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Portfolio Allocation</CardTitle>
                        <CardDescription>
                            Breakdown of your investment portfolio
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]"></div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Portfolio Performance</CardTitle>
                        <CardDescription>
                            Historical performance of your portfolio
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]"></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default InvestmentsPage
