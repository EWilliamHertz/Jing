"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Plus, CheckCircle2, Circle } from "lucide-react"

export default function GoalsPage() {
  const goals = [
    { 
      id: 1, 
      title: "Launch personal business", 
      progress: 68, 
      milestones: [
        { title: "Complete website", done: false },
        { title: "Setup payment gateway", done: true },
        { title: "Finalize product list", done: true }
      ]
    },
    { 
      id: 2, 
      title: "Run a marathon", 
      progress: 30, 
      milestones: [
        { title: "Run 5k without stopping", done: true },
        { title: "Run 10k", done: false },
        { title: "Half marathon", done: false }
      ]
    },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
          <p className="text-muted-foreground mt-1">Turn ambitions into achievable plans.</p>
        </div>
        <Button className="rounded-full shadow-sm"><Plus className="h-4 w-4 mr-2" /> New Goal</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {goals.map((goal, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={goal.id}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-bold text-primary">{goal.progress}%</span>
                </div>
                <CardTitle className="mt-4">{goal.title}</CardTitle>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${goal.progress}%` }} />
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Milestones</h4>
                <div className="space-y-2">
                  {goal.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      {m.done ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className={m.done ? 'text-muted-foreground line-through' : 'font-medium'}>{m.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
