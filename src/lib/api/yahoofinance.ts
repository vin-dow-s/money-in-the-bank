"use server"

import yahooFinance from "yahoo-finance2"

export interface YahooStockQuote {
    symbol: string
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

export interface YahooSearchResult {
    symbol: string
    name: string
    type: string
}

export interface YahooCompanyOverview {
    symbol: string
    shortName: string
    longName: string
    sector?: string
    industry?: string
    exchange?: string
    currency?: string
    marketCap?: number
    dividendYield?: number
    description?: string
}

/**
 * 📈 Get real-time stock quote from Yahoo Finance
 */
export const getStockQuoteYahoo = async (
    symbol: string
): Promise<YahooStockQuote | null> => {
    try {
        const data = await yahooFinance.quote(symbol)

        if (!data || !data.regularMarketPrice) {
            return null
        }

        return {
            symbol: data.symbol,
            price: data.regularMarketPrice,
            change: data.regularMarketChange || 0,
            changePercent: data.regularMarketChangePercent || 0,
            previousClose: data.regularMarketPreviousClose,
            open: data.regularMarketOpen,
            high: data.regularMarketDayHigh,
            low: data.regularMarketDayLow,
            volume: data.regularMarketVolume,
            lastUpdated: new Date().toISOString(),
        }
    } catch (error) {
        console.error(
            `❌ Error fetching stock quote from Yahoo Finance:`,
            error
        )
        return null
    }
}

/**
 * 🔍 Search for stocks and ETFs via Yahoo Finance
 */
export const searchSymbolsYahoo = async (
    query: string
): Promise<YahooSearchResult[]> => {
    try {
        // Proceed with Yahoo Finance search
        const results = await yahooFinance.search(query)

        if (!results || !results.quotes || results.quotes.length === 0) {
            return []
        }

        // Map the results
        return results.quotes.map((item: Record<string, any>) => {
            const symbol = item.symbol || ""
            const name =
                item.shortname || item.longname || item.name || "Unknown"
            const type = item.quoteType || "Unknown"

            return {
                symbol,
                name,
                type,
            }
        })
    } catch (error) {
        console.error(`❌ Error searching symbols in Yahoo Finance:`, error)
        return []
    }
}

/**
 * 🏢 Get company overview from Yahoo Finance
 */
export const getCompanyOverviewYahoo = async (
    symbol: string
): Promise<YahooCompanyOverview | null> => {
    try {
        const data = await yahooFinance.quoteSummary(symbol, {
            modules: ["assetProfile", "price", "summaryDetail"],
        })

        if (!data || !data.assetProfile || !data.price) {
            return null
        }

        return {
            symbol,
            shortName: data.price.shortName || "",
            longName: data.price.longName || "",
            sector: data.assetProfile.sector,
            industry: data.assetProfile.industry,
            exchange: data.price.exchangeName,
            currency: data.price.currency,
            marketCap: data.price.marketCap || 0,
            dividendYield: data.summaryDetail?.dividendYield || 0,
            description: data.assetProfile.longBusinessSummary || "",
        }
    } catch (error) {
        console.error(
            `❌ Error fetching company overview from Yahoo Finance:`,
            error
        )
        return null
    }
}
