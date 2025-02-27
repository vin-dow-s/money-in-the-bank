import { ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { ArrowUp } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

interface StatCardProps {
    title: string
    value: string
    description: string
    icon: React.ReactNode
    trend?: {
        value: string
        isPositive: boolean
    }
    className?: string
    valueClassName?: string
    prefix?: React.ReactNode
    showDecimals?: boolean
}

const StatCard = ({
    title,
    value,
    description,
    icon,
    trend,
    className,
    valueClassName,
    prefix,
    showDecimals = true,
}: StatCardProps) => {
    // Format the value to split the integer and decimal parts
    let integerPart = value
    let decimalPart = ""
    let currencySymbol = ""

    // Extract currency symbol if present (€ or $)
    if (value.includes("€")) {
        currencySymbol = "€"
        value = value.replace("€", "")
    } else if (value.includes("$")) {
        currencySymbol = "$"
        value = value.replace("$", "")
    } else if (value.includes("%")) {
        currencySymbol = "%"
        value = value.replace("%", "")
    }

    // Split the number into integer and decimal parts if showDecimals is true
    if (showDecimals && value.includes(".")) {
        const parts = value.split(".")
        integerPart = parts[0]
        decimalPart = "." + parts[1]
    }

    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium">
                    {title}
                </CardTitle>
                <div className="h-4 w-4 text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div
                    className={cn(
                        "text-4xl font-regular flex items-baseline",
                        valueClassName
                    )}
                >
                    {prefix}
                    {integerPart}
                    <span className="text-sm font-regular">
                        {decimalPart}
                        {currencySymbol}
                    </span>
                </div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
            {trend && (
                <CardFooter className="p-2">
                    <div
                        className={cn(
                            "flex items-center text-xs",
                            trend.isPositive ? "text-green-500" : "text-red-500"
                        )}
                    >
                        {trend.isPositive ? (
                            <ArrowUp className="mr-1 h-3 w-3" />
                        ) : (
                            <ArrowDown className="mr-1 h-3 w-3" />
                        )}
                        <span>{trend.value}</span>
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}

export default StatCard
