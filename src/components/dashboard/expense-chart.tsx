"use client"

import { useState } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const monthlyData = [
    { name: "Jan", expenses: 1200, income: 2400 },
    { name: "Feb", expenses: 1350, income: 2100 },
    { name: "Mar", expenses: 1000, income: 2400 },
    { name: "Apr", expenses: 1500, income: 2300 },
    { name: "May", expenses: 1800, income: 2500 },
    { name: "Jun", expenses: 1200, income: 2600 },
]

const weeklyData = [
    { name: "Mon", expenses: 300, income: 600 },
    { name: "Tue", expenses: 450, income: 500 },
    { name: "Wed", expenses: 200, income: 700 },
    { name: "Thu", expenses: 350, income: 550 },
    { name: "Fri", expenses: 500, income: 600 },
    { name: "Sat", expenses: 250, income: 400 },
    { name: "Sun", expenses: 150, income: 200 },
]

export const ExpenseChart = () => {
    const [activeTab, setActiveTab] = useState("monthly")
    const data = activeTab === "monthly" ? monthlyData : weeklyData

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>
                    Compare your income and expenses over time
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="monthly" onValueChange={setActiveTab}>
                    <div className="flex items-center justify-between">
                        <TabsList>
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                            <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="monthly" className="space-y-4">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={monthlyData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [
                                            `$${value}`,
                                            undefined,
                                        ]}
                                        labelFormatter={(label) =>
                                            `${label} 2024`
                                        }
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="income"
                                        fill="#10b981"
                                        name="Income"
                                    />
                                    <Bar
                                        dataKey="expenses"
                                        fill="#ef4444"
                                        name="Expenses"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                    <TabsContent value="weekly" className="space-y-4">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={weeklyData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value) => [
                                            `$${value}`,
                                            undefined,
                                        ]}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="income"
                                        fill="#10b981"
                                        name="Income"
                                    />
                                    <Bar
                                        dataKey="expenses"
                                        fill="#ef4444"
                                        name="Expenses"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
