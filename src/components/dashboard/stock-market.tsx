"use client"

import { ArrowDown, ArrowUp, Search } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Mock stock data
const stockData = [
    {
        symbol: "VTI",
        name: "Vanguard Total Stock Market ETF",
        price: 252.67,
        change: 1.23,
        changePercent: 0.49,
    },
    {
        symbol: "VOO",
        name: "Vanguard S&P 500 ETF",
        price: 462.18,
        change: 2.15,
        changePercent: 0.47,
    },
    {
        symbol: "QQQ",
        name: "Invesco QQQ Trust",
        price: 438.27,
        change: 3.56,
        changePercent: 0.82,
    },
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 169.3,
        change: -2.45,
        changePercent: -1.43,
    },
    {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        price: 417.88,
        change: 1.78,
        changePercent: 0.43,
    },
    {
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        price: 178.75,
        change: 0.92,
        changePercent: 0.52,
    },
]

export function StockMarket() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredStocks = stockData.filter(
        (stock) =>
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Stock Market</CardTitle>
                <CardDescription>
                    Track your favorite stocks and ETFs
                </CardDescription>
                <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
                    <Input
                        placeholder="Search stocks..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchTerm(e.target.value)
                        }
                        className="h-9"
                    />
                    <Button type="submit" size="icon" className="h-9 w-9">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                        <div className="col-span-3">Symbol</div>
                        <div className="col-span-5">Name</div>
                        <div className="col-span-2 text-right">Price</div>
                        <div className="col-span-2 text-right">Change</div>
                    </div>
                    <div className="divide-y">
                        {filteredStocks.length > 0 ? (
                            filteredStocks.map((stock) => (
                                <div
                                    key={stock.symbol}
                                    className="grid grid-cols-12 items-center p-3 text-sm"
                                >
                                    <div className="col-span-3 font-medium">
                                        {stock.symbol}
                                    </div>
                                    <div className="col-span-5 text-muted-foreground">
                                        {stock.name}
                                    </div>
                                    <div className="col-span-2 text-right">
                                        ${stock.price.toFixed(2)}
                                    </div>
                                    <div
                                        className={cn(
                                            "col-span-2 flex items-center justify-end space-x-1",
                                            stock.change >= 0
                                                ? "text-green-500"
                                                : "text-red-500"
                                        )}
                                    >
                                        {stock.change >= 0 ? (
                                            <ArrowUp className="h-3 w-3" />
                                        ) : (
                                            <ArrowDown className="h-3 w-3" />
                                        )}
                                        <span>
                                            {Math.abs(stock.change).toFixed(2)}{" "}
                                            (
                                            {Math.abs(
                                                stock.changePercent
                                            ).toFixed(2)}
                                            %)
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-sm text-muted-foreground">
                                No stocks found. Try a different search term.
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
