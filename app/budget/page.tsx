import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// Mock budget data
const budgetCategories = [
    { name: "Housing", allocated: 1500, spent: 1450, remaining: 50 },
    { name: "Food", allocated: 600, spent: 450, remaining: 150 },
    { name: "Transportation", allocated: 400, spent: 380, remaining: 20 },
    { name: "Entertainment", allocated: 300, spent: 275, remaining: 25 },
    { name: "Utilities", allocated: 250, spent: 230, remaining: 20 },
    { name: "Shopping", allocated: 200, spent: 250, remaining: -50 },
    { name: "Healthcare", allocated: 150, spent: 100, remaining: 50 },
    { name: "Savings", allocated: 500, spent: 500, remaining: 0 },
]

const BudgetPage = () => {
    const totalAllocated = budgetCategories.reduce(
        (sum, category) => sum + category.allocated,
        0
    )
    const totalSpent = budgetCategories.reduce(
        (sum, category) => sum + category.spent,
        0
    )
    const totalRemaining = totalAllocated - totalSpent

    return (
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Budget</h1>
                <p className="text-muted-foreground">
                    Manage your monthly budget and track your spending.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Budget
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-regular">
                            {totalAllocated}
                            <span className="text-sm">€</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Spent
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-regular">
                            {totalSpent}
                            <span className="text-sm">€</span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Remaining
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className={`text-4xl font-regular ${
                                totalRemaining >= 0
                                    ? "text-green-500"
                                    : "text-red-500"
                            }`}
                        >
                            {totalRemaining}
                            <span className="text-sm">€</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Budget Categories</CardTitle>
                    <CardDescription>
                        Track your spending by category
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-sm border">
                        <div className="grid grid-cols-12 border-b bg-muted/50 p-3 text-sm font-medium">
                            <div className="col-span-4">Category</div>
                            <div className="col-span-2 text-right">
                                Allocated
                            </div>
                            <div className="col-span-2 text-right">Spent</div>
                            <div className="col-span-2 text-right">
                                Remaining
                            </div>
                            <div className="col-span-2 text-right">
                                Progress
                            </div>
                        </div>
                        <div className="divide-y">
                            {budgetCategories.map((category) => (
                                <div
                                    key={category.name}
                                    className="grid grid-cols-12 items-center p-3 text-sm"
                                >
                                    <div className="col-span-4 font-medium">
                                        {category.name}
                                    </div>
                                    <div className="col-span-2 text-right">
                                        {category.allocated}
                                        <span className="text-sm">€</span>
                                    </div>
                                    <div className="col-span-2 text-right">
                                        {category.spent}
                                        <span className="text-sm">€</span>
                                    </div>
                                    <div
                                        className={`col-span-2 text-right ${
                                            category.remaining >= 0
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {category.remaining}
                                        <span className="text-sm">€</span>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="h-2 w-full rounded-sm bg-muted">
                                            <div
                                                className={`h-2 rounded-sm ${
                                                    category.spent /
                                                        category.allocated >
                                                    1
                                                        ? "bg-red-500"
                                                        : category.spent /
                                                              category.allocated >
                                                          0.8
                                                        ? "bg-yellow-500"
                                                        : "bg-green-500"
                                                }`}
                                                style={{
                                                    width: `${Math.min(
                                                        100,
                                                        (category.spent /
                                                            category.allocated) *
                                                            100
                                                    )}%`,
                                                }}
                                            />
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

export default BudgetPage
