"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useWalletStore, WalletHolding } from "@/lib/store/wallet-store"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import {
    ArrowDown,
    ArrowUp,
    Clock,
    Plus,
    RefreshCw,
    Trash2,
} from "lucide-react"
import { useState } from "react"
import { AddHoldingForm } from "./add-holding-form"

export const Wallet = () => {
    const {
        holdings,
        isLoading,
        error,
        removeHolding,
        refreshPrices,
        lastRefreshed,
    } = useWalletStore()
    const [isAddingHolding, setIsAddingHolding] = useState(false)

    const handleRefresh = async () => {
        await refreshPrices()
    }

    return (
        <Card className="col-span-4">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>My Wallet</CardTitle>
                        <CardDescription>Your stocks and ETFs</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                        {lastRefreshed && (
                            <div className="flex items-center text-xs text-muted-foreground m-2 justify-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Last updated:{" "}
                                {formatDistanceToNow(
                                    new Date(lastRefreshed)
                                )}{" "}
                                ago
                            </div>
                        )}
                        <Button
                            variant="outline"
                            onClick={handleRefresh}
                            disabled={isLoading}
                        >
                            <RefreshCw
                                className={cn(
                                    "h-4 w-4 mr-2",
                                    isLoading && "animate-spin"
                                )}
                            />
                            Refresh Prices
                        </Button>
                        <Button
                            variant="cta"
                            onClick={() => setIsAddingHolding(true)}
                            disabled={isAddingHolding}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Holding
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-sm text-sm">
                        {error}
                    </div>
                )}

                {isAddingHolding && (
                    <div className="mb-6 p-4 border rounded-sm">
                        <h3 className="text-lg font-medium mb-8">
                            Add New Holding
                        </h3>
                        <AddHoldingForm
                            onCancel={() => setIsAddingHolding(false)}
                            onSuccess={() => setIsAddingHolding(false)}
                        />
                    </div>
                )}

                {holdings.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>You don&apos;t have any holdings yet.</p>
                        <p>Click &quot;Add Holding&quot; to get started.</p>
                    </div>
                ) : (
                    <div className="rounded-sm border">
                        <div className="grid grid-cols-10 border-b bg-muted/50 p-3 text-sm font-medium">
                            <div className="col-span-1">Symbol</div>
                            <div className="col-span-3">Name</div>
                            <div className="col-span-1 text-right">
                                Current /1
                            </div>
                            <div className="col-span-1 text-right">Shares</div>
                            <div className="col-span-1 text-right">Spent</div>
                            <div className="col-span-1 text-right">Value</div>
                            <div className="col-span-1 text-right">Gain %</div>
                            <div className="col-span-1 text-right">Actions</div>
                        </div>
                        <div className="divide-y">
                            {holdings.map((holding: WalletHolding) => (
                                <div
                                    key={holding.id}
                                    className="grid grid-cols-10 items-center p-3 text-sm"
                                >
                                    <div className="col-span-1 text-muted-foreground">
                                        {holding.symbol}
                                    </div>
                                    <div className="col-span-3">
                                        {holding.name}
                                    </div>
                                    <div className="col-span-1 text-right">
                                        {holding.currentPrice?.toFixed(2) ||
                                            "-"}
                                        €
                                    </div>
                                    <div className="col-span-1 text-right">
                                        {holding.shares}
                                    </div>
                                    <div className="col-span-1 text-right">
                                        {holding.purchasePrice.toFixed(2)}€
                                    </div>

                                    <div className="col-span-1 text-right font-medium">
                                        {holding.currentValue?.toFixed(2) ||
                                            "-"}
                                        €
                                    </div>
                                    <div
                                        className={cn(
                                            "col-span-1 text-right",
                                            (holding.gainPercent || 0) >= 0
                                                ? "text-green-500"
                                                : "text-red-500"
                                        )}
                                    >
                                        {holding.gainPercent !== undefined ? (
                                            <div className="flex items-center justify-end">
                                                {holding.gainPercent >= 0 ? (
                                                    <ArrowUp className="mr-1 h-3 w-3" />
                                                ) : (
                                                    <ArrowDown className="mr-1 h-3 w-3" />
                                                )}
                                                {Math.abs(
                                                    holding.gainPercent
                                                ).toFixed(2)}
                                                %
                                            </div>
                                        ) : (
                                            "-"
                                        )}
                                    </div>
                                    <div className="col-span-1 text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() =>
                                                removeHolding(holding.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
