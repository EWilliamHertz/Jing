"use client"

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { MoneyWidget } from "@/components/dashboard/money-widget"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { usePrompt } from "@/components/ui/prompt-dialog"
import { addMoney, deleteMoneyTransaction } from "@/app/actions"
import { motion } from "framer-motion"

export default function MoneyClientPage({ initialData }: { initialData: any[] }) {
  const [activeTab, setActiveTab] = useState("all")
  const { ask } = usePrompt()
  const [isPending, startTransition] = useTransition()
  
  const transactions = initialData;
  const filtered = transactions.filter(t => activeTab === 'all' || t.type === activeTab)

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Money</h1>
          <p className="text-muted-foreground mt-1">Understand where your money goes.</p>
        </div>
        <Button 
          className="rounded-full shadow-sm"
          disabled={isPending}
          onClick={async () => {
            const description = await ask("Transaction description:")
            if (description) {
              const amount = await ask("Amount (e.g. 15.00):")
              if (amount) {
                const type = await ask("Type (expense, income, debt):", "expense")
                startTransition(() => addMoney(amount, description, type || "expense"))
              }
            }
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Transaction
        </Button>
      </div>

      <div className="flex gap-6 border-b border-border">
        {['all', 'expense', 'income', 'debt'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div layoutId="money-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Transactions</h3>
              {filtered.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">No transactions found.</p>
              ) : (
                <div className="space-y-4">
                  {filtered.map((t: any) => (
                    <div key={t.id} className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0 group">
                      <div>
                        <p className="font-medium">{t.description}</p>
                        <p className="text-xs text-muted-foreground uppercase">{t.type} • {new Date(t.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-semibold ${t.type === 'income' ? 'text-green-500' : t.type === 'debt' ? 'text-red-500' : ''}`}>
                          {t.type === 'income' ? '+' : '-'}${t.amount}
                        </span>
                        <button disabled={isPending} onClick={() => startTransition(() => deleteMoneyTransaction(t.id))} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <MoneyWidget money={transactions} />
        </div>
      </div>
    </div>
  )
}
