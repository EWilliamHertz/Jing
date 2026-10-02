"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Wallet } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function MoneyWidget() {
  const isLoggedIn = useAuth()

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wallet className="h-4 w-4 text-green-600 dark:text-green-500" /> Money
        </CardTitle>
        <CardDescription>This month</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoggedIn ? (
          <p className="text-sm text-muted-foreground text-center py-2">No expenses logged.</p>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Spent</span>
              <span className="font-medium">€2,430</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-medium text-green-600 dark:text-green-500">€1,570</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-1">
              <div className="h-full bg-foreground rounded-full opacity-30" style={{ width: '60%' }} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
