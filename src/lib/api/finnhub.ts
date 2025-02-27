const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1"

export interface FinnhubStockQuote {
    symbol: string
    price: number
    change: number
    changePercent: number
    high: number
    low: number
    open: number
    previousClose: number
    lastUpdated: string
}

export interface FinnhubSearchResult {
    symbol: string
    name: string
    type: string
}

/**
 * 🔍 Search for stocks and ETFs via Finnhub (fallback when Alpha Vantage fails)
 */
export const searchSymbolsFinnhub = async (
    query: string
): Promise<FinnhubSearchResult[]> => {
    try {
        const response = await fetch(
            `${FINNHUB_BASE_URL}/search?q=${query}&token=${FINNHUB_API_KEY}`
        )

        if (!response.ok) {
            throw new Error(
                `Finnhub API request failed with status ${response.status}`
            )
        }

        const data = await response.json()

        if (!data.result || data.result.length === 0) {
            return []
        }

        return data.result.map((match: any) => ({
            symbol: match.symbol,
            name: match.description,
            type: match.type === "Common Stock" ? "Stock" : match.type,
        }))
    } catch (error) {
        console.error(`❌ Error searching symbols in Finnhub:`, error)
        return []
    }
}

/**
 * 📈 Get real-time stock quote from Finnhub (fallback when Alpha Vantage is limited)
 */
export const getStockQuoteFinnhub = async (
    symbol: string
): Promise<FinnhubStockQuote | null> => {
    try {
        const response = await fetch(
            `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
        )

        if (!response.ok) {
            throw new Error(
                `Finnhub API request failed with status ${response.status}`
            )
        }

        const data = await response.json()
        if (!data || data.c === undefined) {
            return null
        }

        return {
            symbol,
            price: data.c,
            change: data.d || 0,
            changePercent: data.dp || 0,
            high: data.h,
            low: data.l,
            open: data.o,
            previousClose: data.pc,
            lastUpdated: new Date().toISOString(),
        }
    } catch (error) {
        console.error(`❌ Error fetching stock quote from Finnhub:`, error)
        return null
    }
}
