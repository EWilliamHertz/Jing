"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Wallet } from "lucide-react"

export function MoneyWidget({ money = [] }: { money?: any[] }) {
  

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wallet className="h-4 w-4 text-green-600 dark:text-green-500" /> Money
        </CardTitle>
        <CardDescription>This month</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {money.length === 0 ? (<p className="text-sm text-muted-foreground text-center py-2">No expenses logged.</p>) : (<div className="space-y-3">{money.map((m: any) => (<div key={m.id} className="flex justify-between text-sm"><span className="text-muted-foreground">{m.description}</span><span className="font-medium">${m.amount}</span></div>))}</div>)}
      </CardContent>
    </Card>
  )
}
