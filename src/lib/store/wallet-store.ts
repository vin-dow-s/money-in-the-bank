import { getStockQuote } from "@/lib/api/alphavantage"
import { create } from "zustand"
import { persist, PersistOptions } from "zustand/middleware"

export interface WalletHolding {
    id: string
    symbol: string
    name: string
    shares: number
    purchasePrice: number
    purchaseDate: string
    currentPrice?: number
    currentValue?: number
    gain?: number
    gainPercent?: number
    lastUpdated?: string
}

interface WalletState {
    holdings: WalletHolding[]
    isLoading: boolean
    error: string | null
    lastRefreshed: string | null

    // Derived values
    totalValue: number
    totalCost: number
    totalGain: number
    totalGainPercent: number

    // Actions
    addHolding: (
        holding: Omit<
            WalletHolding,
            | "id"
            | "currentPrice"
            | "currentValue"
            | "gain"
            | "gainPercent"
            | "lastUpdated"
        >
    ) => Promise<void>
    updateHolding: (id: string, updates: Partial<WalletHolding>) => void
    removeHolding: (id: string) => void
    refreshPrices: () => Promise<void>
    setIsLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
}

type WalletPersist = PersistOptions<
    WalletState,
    Pick<
        WalletState,
        | "holdings"
        | "totalValue"
        | "totalCost"
        | "totalGain"
        | "totalGainPercent"
        | "lastRefreshed"
    >
>

const persistConfig: WalletPersist = {
    name: "wallet-storage",
    partialize: (state) => ({
        holdings: state.holdings,
        totalValue: state.totalValue,
        totalCost: state.totalCost,
        totalGain: state.totalGain,
        totalGainPercent: state.totalGainPercent,
        lastRefreshed: state.lastRefreshed,
    }),
}

export const useWalletStore = create<WalletState>()(
    persist(
        (set, get) => ({
            holdings: [],
            isLoading: false,
            error: null,
            lastRefreshed: null,
            totalValue: 0,
            totalCost: 0,
            totalGain: 0,
            totalGainPercent: 0,

            setIsLoading: (isLoading: boolean) => set({ isLoading }),

            setError: (error: string | null) => set({ error }),

            addHolding: async (newHolding) => {
                set({ isLoading: true, error: null })

                try {
                    const quote = await getStockQuote(newHolding.symbol)
                    const currentPrice = quote.price
                    const currentValue = currentPrice * newHolding.shares
                    const gain =
                        currentValue -
                        newHolding.purchasePrice * newHolding.shares
                    const gainPercent =
                        ((currentPrice - newHolding.purchasePrice) /
                            newHolding.purchasePrice) *
                        100

                    const holding: WalletHolding = {
                        ...newHolding,
                        id: crypto.randomUUID(),
                        currentPrice,
                        currentValue,
                        gain,
                        gainPercent,
                        lastUpdated: quote.lastUpdated,
                    }

                    const holdings = [...get().holdings, holding]

                    // Calculate derived values
                    const totalValue = holdings.reduce(
                        (sum, holding) => sum + (holding.currentValue || 0),
                        0
                    )
                    const totalCost = holdings.reduce(
                        (sum, holding) =>
                            sum + holding.purchasePrice * holding.shares,
                        0
                    )
                    const totalGain = totalValue - totalCost
                    const totalGainPercent =
                        totalCost > 0 ? (totalGain / totalCost) * 100 : 0

                    set({
                        holdings,
                        isLoading: false,
                        totalValue,
                        totalCost,
                        totalGain,
                        totalGainPercent,
                        lastRefreshed: new Date().toISOString(),
                    })
                } catch (err) {
                    const errorMessage = `Failed to add ${newHolding.symbol}. Please try again.`
                    console.error(errorMessage, err)
                    set({ isLoading: false, error: errorMessage })
                    throw err
                }
            },

            updateHolding: (id: string, updates: Partial<WalletHolding>) => {
                const holdings = get().holdings.map((holding) =>
                    holding.id === id ? { ...holding, ...updates } : holding
                )

                // Calculate derived values
                const totalValue = holdings.reduce(
                    (sum, holding) => sum + (holding.currentValue || 0),
                    0
                )
                const totalCost = holdings.reduce(
                    (sum, holding) =>
                        sum + holding.purchasePrice * holding.shares,
                    0
                )
                const totalGain = totalValue - totalCost
                const totalGainPercent =
                    totalCost > 0 ? (totalGain / totalCost) * 100 : 0

                set({
                    holdings,
                    totalValue,
                    totalCost,
                    totalGain,
                    totalGainPercent,
                })
            },

            removeHolding: (id: string) => {
                const holdings = get().holdings.filter(
                    (holding) => holding.id !== id
                )

                // Calculate derived values
                const totalValue = holdings.reduce(
                    (sum, holding) => sum + (holding.currentValue || 0),
                    0
                )
                const totalCost = holdings.reduce(
                    (sum, holding) =>
                        sum + holding.purchasePrice * holding.shares,
                    0
                )
                const totalGain = totalValue - totalCost
                const totalGainPercent =
                    totalCost > 0 ? (totalGain / totalCost) * 100 : 0

                set({
                    holdings,
                    totalValue,
                    totalCost,
                    totalGain,
                    totalGainPercent,
                })
            },

            refreshPrices: async () => {
                const { holdings } = get()

                if (holdings.length === 0) return

                set({ isLoading: true, error: null })

                try {
                    const updatedHoldings = await Promise.all(
                        holdings.map(async (holding) => {
                            try {
                                const quote = await getStockQuote(
                                    holding.symbol
                                )
                                const currentPrice = quote.price
                                const currentValue =
                                    currentPrice * holding.shares
                                const gain =
                                    currentValue -
                                    holding.purchasePrice * holding.shares
                                const gainPercent =
                                    ((currentPrice - holding.purchasePrice) /
                                        holding.purchasePrice) *
                                    100

                                return {
                                    ...holding,
                                    currentPrice,
                                    currentValue,
                                    gain,
                                    gainPercent,
                                    lastUpdated: quote.lastUpdated,
                                }
                            } catch (err) {
                                console.error(
                                    `Failed to update price for ${holding.symbol}:`,
                                    err
                                )
                                return holding
                            }
                        })
                    )

                    // Calculate derived values
                    const totalValue = updatedHoldings.reduce(
                        (sum, holding) => sum + (holding.currentValue || 0),
                        0
                    )
                    const totalCost = updatedHoldings.reduce(
                        (sum, holding) =>
                            sum + holding.purchasePrice * holding.shares,
                        0
                    )
                    const totalGain = totalValue - totalCost
                    const totalGainPercent =
                        totalCost > 0 ? (totalGain / totalCost) * 100 : 0

                    set({
                        holdings: updatedHoldings,
                        isLoading: false,
                        totalValue,
                        totalCost,
                        totalGain,
                        totalGainPercent,
                        lastRefreshed: new Date().toISOString(),
                    })
                } catch (err) {
                    const errorMessage =
                        "Failed to refresh prices. Please try again later."
                    console.error(errorMessage, err)
                    set({ isLoading: false, error: errorMessage })
                }
            },
        }),
        persistConfig
    )
)
