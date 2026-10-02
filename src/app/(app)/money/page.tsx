"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MoneyWidget } from "@/components/dashboard/money-widget"

export default function MoneyPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Money</h1>
        <p className="text-muted-foreground mt-1">Understand where your money goes.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-4">
                {[
                  { name: "Grocery Store", amount: "-€124.50", date: "Today" },
                  { name: "Netflix", amount: "-€15.99", date: "Yesterday" },
                  { name: "Salary", amount: "+€3,200.00", date: "Oct 1", positive: true }
                ].map((t, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                    </div>
                    <span className={`font-semibold ${t.positive ? 'text-green-500' : ''}`}>{t.amount}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <MoneyWidget />
        </div>
      </div>
    </div>
  )
}
