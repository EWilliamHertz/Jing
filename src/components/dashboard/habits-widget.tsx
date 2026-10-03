"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function HabitsWidget({ habits = [] }: { habits?: any[] }) {
  

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Habits</CardTitle>
      </CardHeader>
      <CardContent className="pt-2 space-y-4">
        {habits.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">No habits tracked yet.</p>
        ) : (
          habits.map((habit, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer">
              <span className={`text-sm ${habit.done ? 'text-muted-foreground' : ''}`}>{habit.title}</span>
              <button className="focus:outline-none">
                {habit.done ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <div className="h-5 w-5 rounded-full border border-muted-foreground group-hover:border-primary transition-colors" />
                )}
              </button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
