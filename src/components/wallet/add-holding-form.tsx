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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { searchSymbols } from "@/lib/api/alphavantage"
import { useWalletStore } from "@/lib/store/wallet-store"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ChevronsUpDown, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
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

type SearchType = "symbol" | "name"

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
    const [open, setOpen] = useState(false)
    const [formSubmitting, setFormSubmitting] = useState(false)
    const [searchType, setSearchType] = useState<SearchType>("symbol")

    const form = useForm<AddHoldingFormValues>({
        resolver: zodResolver(addHoldingSchema),
        defaultValues: {
            symbol: "",
            name: "",
            shares: undefined,
            purchasePrice: undefined,
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

            setIsSearching(true)
            try {
                const results = await searchSymbols(searchQuery)

                // Filter results based on search type
                const filteredResults =
                    searchType === "symbol"
                        ? results.filter((stock) =>
                              stock.symbol
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                          )
                        : results.filter((stock) =>
                              stock.name
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                          )

                setSearchResults(
                    filteredResults.length > 0 ? filteredResults : results
                )
            } catch (error) {
                console.error("Error searching for symbols:", error)
                setSearchResults([])
            } finally {
                setIsSearching(false)
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery, searchType])

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
        setSelectedStock(stock)
        form.setValue("symbol", stock.symbol)
        form.setValue("name", stock.name)
        setOpen(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                    <FormField
                        control={form.control}
                        name="symbol"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Stock Symbol</FormLabel>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                                disabled={
                                                    formSubmitting || isLoading
                                                }
                                            >
                                                {field.value
                                                    ? selectedStock?.symbol ||
                                                      field.value
                                                    : "Search..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 w-[400px] max-h-[350px] overflow-y-auto">
                                        <Command className=" [&_[cmdk-item]]:!pointer-events-auto [&_[cmdk-item]]:!opacity-100">
                                            <div className="flex items-center border-b">
                                                <CommandInput
                                                    placeholder={`Search by...`}
                                                    value={searchQuery}
                                                    onValueChange={
                                                        setSearchQuery
                                                    }
                                                    className="h-9 flex-1"
                                                />
                                            </div>

                                            <Tabs
                                                defaultValue="symbol"
                                                value={searchType}
                                                onValueChange={(value) =>
                                                    setSearchType(
                                                        value as SearchType
                                                    )
                                                }
                                                className="w-full"
                                            >
                                                <div className="border-b px-1 py-1">
                                                    <TabsList className="w-full grid grid-cols-2">
                                                        <TabsTrigger value="symbol">
                                                            Stock Symbol
                                                        </TabsTrigger>
                                                        <TabsTrigger value="name">
                                                            ETF Name
                                                        </TabsTrigger>
                                                    </TabsList>
                                                </div>

                                                <CommandList>
                                                    {isSearching && (
                                                        <div className="flex items-center justify-center py-6">
                                                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                                        </div>
                                                    )}
                                                    {!isSearching && (
                                                        <CommandEmpty>
                                                            {searchQuery.length <
                                                            2
                                                                ? "Type at least 2 characters to search"
                                                                : "No stocks found"}
                                                        </CommandEmpty>
                                                    )}
                                                    <CommandGroup heading="Results">
                                                        {searchResults.map(
                                                            (stock) => (
                                                                <CommandItem
                                                                    key={
                                                                        stock.symbol
                                                                    }
                                                                    value={
                                                                        searchType ===
                                                                        "symbol"
                                                                            ? stock.symbol
                                                                            : stock.name
                                                                    }
                                                                    onSelect={() =>
                                                                        handleSelectStock(
                                                                            stock
                                                                        )
                                                                    }
                                                                    className="flex justify-between !opacity-100 !pointer-events-auto"
                                                                >
                                                                    <span className="ml-2 text-foreground">
                                                                        {
                                                                            stock.name
                                                                        }
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
                                                </CommandList>
                                            </Tabs>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="shares"
                        render={({ field }) => (
                            <FormItem className="w-40">
                                <FormLabel>Number of Shares</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        step="0.01"
                                        min="0.01"
                                        {...field}
                                        disabled={formSubmitting || isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="purchasePrice"
                        render={({ field }) => (
                            <FormItem className="w-40">
                                <FormLabel>Purchase Price (€)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0.01"
                                        {...field}
                                        disabled={formSubmitting || isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="purchaseDate"
                        render={({ field }) => (
                            <FormItem>
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

                <div className="grid grid-cols-1 gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Company name"
                                        {...field}
                                        disabled={
                                            !!selectedStock ||
                                            formSubmitting ||
                                            isLoading
                                        }
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
