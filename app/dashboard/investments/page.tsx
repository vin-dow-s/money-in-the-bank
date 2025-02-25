import { Plus } from "lucide-react"
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

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

export default function InvestmentsPage() {
    const totalPortfolioValue = portfolioData.reduce(
        (sum, item) => sum + item.value,
        0
    )

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

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Portfolio Value
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalPortfolioValue.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Updated just now
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Monthly Return
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">
                            +$500.00 (7.7%)
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Last 30 days
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            YTD Return
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">
                            +$2,000.00 (40.0%)
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Since Jan 1, 2024
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Portfolio Allocation</CardTitle>
                        <CardDescription>
                            Breakdown of your investment portfolio
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={portfolioData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(
                                                0
                                            )}%`
                                        }
                                    >
                                        {portfolioData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => [
                                            `$${value}`,
                                            "Value",
                                        ]}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
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
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={performanceData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={(tick) => {
                                            const date = new Date(tick)
                                            return `${date.toLocaleString(
                                                "default",
                                                { month: "short" }
                                            )}`
                                        }}
                                    />
                                    <YAxis
                                        tickFormatter={(tick) => `$${tick}`}
                                    />
                                    <Tooltip
                                        formatter={(value) => [
                                            `$${value}`,
                                            "Portfolio Value",
                                        ]}
                                        labelFormatter={(label) => {
                                            const date = new Date(label)
                                            return `${date.toLocaleString(
                                                "default",
                                                {
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}`
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        dot={{ r: 4 }}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Holdings</CardTitle>
                    <CardDescription>
                        Your current investment holdings
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                            <div className="col-span-1">#</div>
                            <div className="col-span-2">Symbol</div>
                            <div className="col-span-3">Name</div>
                            <div className="col-span-1 text-right">Shares</div>
                            <div className="col-span-1 text-right">Price</div>
                            <div className="col-span-2 text-right">Value</div>
                            <div className="col-span-2 text-right">
                                Allocation
                            </div>
                        </div>
                        <div className="divide-y">
                            {holdingsData.map((holding, index) => (
                                <div
                                    key={holding.symbol}
                                    className="grid grid-cols-12 items-center p-3 text-sm"
                                >
                                    <div className="col-span-1 text-muted-foreground">
                                        {index + 1}
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        {holding.symbol}
                                    </div>
                                    <div className="col-span-3 text-muted-foreground">
                                        {holding.name}
                                    </div>
                                    <div className="col-span-1 text-right">
                                        {holding.shares !== null
                                            ? holding.shares
                                            : "-"}
                                    </div>
                                    <div className="col-span-1 text-right">
                                        {holding.price !== null
                                            ? `$${holding.price.toFixed(2)}`
                                            : "-"}
                                    </div>
                                    <div className="col-span-2 text-right">
                                        ${holding.value.toFixed(2)}
                                    </div>
                                    <div className="col-span-2 text-right">
                                        <div className="flex items-center justify-end">
                                            <span className="mr-2">
                                                {holding.allocation.toFixed(1)}%
                                            </span>
                                            <div className="h-2 w-16 rounded-full bg-muted">
                                                <div
                                                    className="h-2 rounded-full bg-primary"
                                                    style={{
                                                        width: `${holding.allocation}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
