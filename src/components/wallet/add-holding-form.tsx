"use client"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { searchSymbolsYahoo } from "@/lib/api/yahoofinance"
import { useWalletStore } from "@/lib/store/wallet-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ChevronsUpDown, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const addHoldingSchema = z.object({
    symbol: z.string().min(1, "Symbol is required"),
    name: z.string().min(1, "Name is required"),
    shares: z.coerce.number().positive("Number of shares must be positive"),
    purchasePrice: z.coerce
        .number()
        .positive("Purchase price must be positive"),
    purchaseDate: z.string().min(1, "Purchase date is required"),
})

type AddHoldingFormValues = z.infer<typeof addHoldingSchema>

interface SearchResult {
    symbol: string
    name: string
    type: string
}

export const AddHoldingForm = ({
    onCancel,
    onSuccess,
}: {
    onCancel: () => void
    onSuccess: () => void
}) => {
    const { addHolding, isLoading } = useWalletStore()
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [selectedStock, setSelectedStock] = useState<SearchResult | null>(
        null
    )
    const [openSearch, setOpenSearch] = useState(false)
    const [formSubmitting, setFormSubmitting] = useState(false)
    const searchCacheRef = useRef<{ [key: string]: SearchResult[] }>({})

    const form = useForm<AddHoldingFormValues>({
        resolver: zodResolver(addHoldingSchema),
        defaultValues: {
            symbol: "",
            name: "",
            shares: 0,
            purchasePrice: 0,
            purchaseDate: format(new Date(), "yyyy-MM-dd"),
        },
    })

    // Search for stocks when the search query changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length < 2) {
                setSearchResults([])
                return
            }

            // Check if we have cached results for this query
            const cacheKey = searchQuery

            if (searchCacheRef.current[cacheKey]) {
                setSearchResults(searchCacheRef.current[cacheKey])
                return
            }

            setIsSearching(true)
            try {
                const results = await searchSymbolsYahoo(searchQuery)

                // Cache the results
                searchCacheRef.current[cacheKey] = results
                setSearchResults(results)
            } catch (error) {
                console.error("Error searching for symbols:", error)
                setSearchResults([])
            } finally {
                setIsSearching(false)
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    const updateFormWithStock = (stock: SearchResult) => {
        setSelectedStock(stock)
        form.setValue("symbol", stock.symbol)
        form.setValue("name", stock.name)
    }

    const onSubmit = async (data: AddHoldingFormValues) => {
        setFormSubmitting(true)
        try {
            await addHolding(data)
            form.reset()
            onSuccess()
        } catch (error) {
            console.error("Error adding holding:", error)
        } finally {
            setFormSubmitting(false)
        }
    }

    const handleSelectStock = (stock: SearchResult) => {
        updateFormWithStock(stock)
        setOpenSearch(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-6 gap-3">
                    {/* Search Field */}
                    <FormField
                        control={form.control}
                        name="symbol"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Stock/ETF Name</FormLabel>
                                <Popover
                                    open={openSearch}
                                    onOpenChange={setOpenSearch}
                                >
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className="h-10 w-full justify-between"
                                            >
                                                {selectedStock ? (
                                                    <span>
                                                        {selectedStock.name} (
                                                        {selectedStock.symbol})
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        Search by name, stock
                                                        symbol, ISIN code...
                                                    </span>
                                                )}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 w-[600px] max-h-[350px] overflow-y-auto">
                                        <Command shouldFilter={false}>
                                            <CommandInput
                                                placeholder="Ex: S&P 500, WPEA, FR0011550185..."
                                                value={searchQuery}
                                                onValueChange={setSearchQuery}
                                                className="h-9"
                                            />

                                            <CommandList>
                                                <CommandGroup heading="Results">
                                                    {searchResults.map(
                                                        (stock) => (
                                                            <CommandItem
                                                                key={`${stock.symbol}-${stock.name}`}
                                                                value={`${stock.symbol}-${stock.name}`}
                                                                onSelect={() =>
                                                                    handleSelectStock(
                                                                        stock
                                                                    )
                                                                }
                                                                className="flex justify-between !opacity-100 !pointer-events-auto"
                                                            >
                                                                <span className="ml-2 text-foreground">
                                                                    {stock.name}
                                                                </span>
                                                                <span className="font-regular text-muted-foreground">
                                                                    {
                                                                        stock.symbol
                                                                    }
                                                                </span>
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                                {isSearching && (
                                                    <div className="flex items-center justify-center py-6">
                                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                                    </div>
                                                )}
                                                {!isSearching &&
                                                    searchResults.length ===
                                                        0 && (
                                                        <CommandEmpty>
                                                            {searchQuery.length <
                                                            2
                                                                ? "Type at least 2 characters to search"
                                                                : "No stocks found"}
                                                        </CommandEmpty>
                                                    )}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Shares */}
                    <FormField
                        control={form.control}
                        name="shares"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Shares</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="0"
                                        min="0"
                                        {...field}
                                        value={
                                            field.value === 0 ? "" : field.value
                                        }
                                        onChange={(e) => {
                                            const inputValue = e.target.value
                                            if (
                                                inputValue === "" ||
                                                /^[0-9]*\.?[0-9]*$/.test(
                                                    inputValue
                                                )
                                            ) {
                                                field.onChange(inputValue)
                                            }
                                        }}
                                        onBlur={() => {
                                            if (
                                                field.value !== 0 &&
                                                !isNaN(Number(field.value))
                                            ) {
                                                field.onChange(
                                                    parseFloat(
                                                        String(field.value)
                                                    )
                                                )
                                            }
                                        }}
                                        disabled={formSubmitting || isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Purchase Price */}
                    <FormField
                        control={form.control}
                        name="purchasePrice"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Purchase Price (€)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0.01"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            const value =
                                                e.target.value === ""
                                                    ? 0
                                                    : parseFloat(e.target.value)
                                            field.onChange(value)
                                        }}
                                        disabled={formSubmitting || isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Purchase Date */}
                    <FormField
                        control={form.control}
                        name="purchaseDate"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        {...field}
                                        disabled={formSubmitting || isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-start space-x-2 mt-8">
                    <Button
                        type="submit"
                        disabled={formSubmitting || isLoading}
                        className="min-w-[140px]"
                    >
                        {(formSubmitting || isLoading) && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {formSubmitting ? "Adding..." : "Add to Portfolio"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={formSubmitting || isLoading}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}
