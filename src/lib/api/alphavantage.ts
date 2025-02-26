// Alpha Vantage API utility functions
const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY
const BASE_URL = "https://www.alphavantage.co/query"

export interface StockQuote {
    symbol: string
    name?: string
    price: number
    change: number
    changePercent: number
    previousClose?: number
    open?: number
    high?: number
    low?: number
    volume?: number
    lastUpdated: string
}

export interface ETFData {
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
    lastUpdated: string
}

export interface CompanyOverview {
    Symbol: string
    AssetType: string
    Name: string
    Description: string
    Exchange: string
    Currency: string
    Country: string
    Sector: string
    Industry: string
    MarketCapitalization: string
    PERatio: string
    DividendYield: string
    [key: string]: string
}

interface SymbolSearchMatch {
    "1. symbol": string
    "2. name": string
    "3. type": string
    "4. region": string
    "5. marketOpen": string
    "6. marketClose": string
    "7. timezone": string
    "8. currency": string
    "9. matchScore": string
}

/**
 * Get global quote for a stock or ETF
 */
export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
    try {
        const response = await fetch(
            `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        )

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log("🚀 ~ getStockQuote ~ data:", data)

        if (data["Error Message"]) {
            throw new Error(data["Error Message"])
        }

        if (
            !data["Global Quote"] ||
            Object.keys(data["Global Quote"]).length === 0
        ) {
            throw new Error(`No data found for symbol ${symbol}`)
        }

        const quote = data["Global Quote"]

        return {
            symbol: quote["01. symbol"],
            price: parseFloat(quote["05. price"]),
            change: parseFloat(quote["09. change"]),
            changePercent: parseFloat(
                quote["10. change percent"].replace("%", "")
            ),
            previousClose: parseFloat(quote["08. previous close"]),
            open: parseFloat(quote["02. open"]),
            high: parseFloat(quote["03. high"]),
            low: parseFloat(quote["04. low"]),
            volume: parseInt(quote["06. volume"]),
            lastUpdated: quote["07. latest trading day"],
        }
    } catch (error) {
        console.error(`Error fetching stock quote for ${symbol}:`, error)
        throw error
    }
}

/**
 * Search for stocks and ETFs
 */
export const searchSymbols = async (
    query: string
): Promise<{ symbol: string; name: string; type: string }[]> => {
    console.log("🚀 ~ query:", query)
    try {
        const response = await fetch(
            `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`
        )

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log("🚀 ~ data:", data)

        if (data["Error Message"]) {
            throw new Error(data["Error Message"])
        }

        if (!data.bestMatches) {
            return []
        }

        const formattedResults = data.bestMatches.map(
            (match: SymbolSearchMatch) => ({
                symbol: match["1. symbol"],
                name: match["2. name"],
                type: match["3. type"], // This should show 'ETF' for ETFs
            })
        )

        console.log("✅ Processed Results:", formattedResults) // LOG FILTERED RESULTS

        return formattedResults
    } catch (error) {
        console.error(`Error searching symbols for ${query}:`, error)
        throw error
    }
}

/**
 * Get company overview for a stock or ETF
 */
export const getCompanyOverview = async (
    symbol: string
): Promise<CompanyOverview> => {
    try {
        const response = await fetch(
            `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
        )

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()

        if (data["Error Message"]) {
            throw new Error(data["Error Message"])
        }

        return data as CompanyOverview
    } catch (error) {
        console.error(`Error fetching company overview for ${symbol}:`, error)
        throw error
    }
}
