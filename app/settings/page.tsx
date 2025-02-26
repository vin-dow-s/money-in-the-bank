import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const SettingsPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-auto">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="notifications">
                        Notifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                Update your personal information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        placeholder="John"
                                        defaultValue="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Doe"
                                        defaultValue="Doe"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    defaultValue="john.doe@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    defaultValue="+1 (555) 123-4567"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Update your password
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">
                                    Current Password
                                </Label>
                                <Input id="currentPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">
                                    New Password
                                </Label>
                                <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm New Password
                                </Label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Update Password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Display Settings</CardTitle>
                            <CardDescription>
                                Customize how the application looks
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="currency">Currency</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Choose your preferred currency
                                    </p>
                                </div>
                                <Select defaultValue="usd">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="usd">
                                            USD ($)
                                        </SelectItem>
                                        <SelectItem value="eur">
                                            EUR (€)
                                        </SelectItem>
                                        <SelectItem value="gbp">
                                            GBP (£)
                                        </SelectItem>
                                        <SelectItem value="jpy">
                                            JPY (¥)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Date Format</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Choose your preferred date format
                                    </p>
                                </div>
                                <Select defaultValue="mdy">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select date format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mdy">
                                            MM/DD/YYYY
                                        </SelectItem>
                                        <SelectItem value="dmy">
                                            DD/MM/YYYY
                                        </SelectItem>
                                        <SelectItem value="ymd">
                                            YYYY/MM/DD
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Preferences</Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Budget Settings</CardTitle>
                            <CardDescription>
                                Configure your budget preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Budget Period</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Set your preferred budget period
                                    </p>
                                </div>
                                <Select defaultValue="monthly">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="weekly">
                                            Weekly
                                        </SelectItem>
                                        <SelectItem value="biweekly">
                                            Bi-weekly
                                        </SelectItem>
                                        <SelectItem value="monthly">
                                            Monthly
                                        </SelectItem>
                                        <SelectItem value="quarterly">
                                            Quarterly
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Start of Month</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Set when your budget month starts
                                    </p>
                                </div>
                                <Select defaultValue="1">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select day" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">
                                            1st of month
                                        </SelectItem>
                                        <SelectItem value="15">
                                            15th of month
                                        </SelectItem>
                                        <SelectItem value="custom">
                                            Custom date
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Budget Settings</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Settings</CardTitle>
                            <CardDescription>
                                Configure how you receive notifications
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="emailNotifications">
                                        Email Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive notifications via email
                                    </p>
                                </div>
                                <Switch
                                    id="emailNotifications"
                                    defaultChecked
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="pushNotifications">
                                        Push Notifications
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive push notifications on your
                                        device
                                    </p>
                                </div>
                                <Switch id="pushNotifications" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="budgetAlerts">
                                        Budget Alerts
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified when you&apos;re close to
                                        exceeding your budget
                                    </p>
                                </div>
                                <Switch id="budgetAlerts" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="investmentAlerts">
                                        Investment Alerts
                                    </Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified about significant changes
                                        in your investments
                                    </p>
                                </div>
                                <Switch id="investmentAlerts" defaultChecked />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Notification Settings</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default SettingsPage
