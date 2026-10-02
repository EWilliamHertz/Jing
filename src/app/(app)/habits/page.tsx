"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Flame, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function HabitsPage() {
  const isLoggedIn = useAuth()
  
  const habits = isLoggedIn ? [] : [
    { id: 1, name: "Morning walk", streak: 12, completedToday: true, color: "bg-orange-500" },
    { id: 2, name: "Read 20 minutes", streak: 5, completedToday: true, color: "bg-blue-500" },
    { id: 3, name: "Drink water", streak: 1, completedToday: false, color: "bg-cyan-500" },
    { id: 4, name: "Meditation", streak: 0, completedToday: false, color: "bg-purple-500" },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Habits</h1>
          <p className="text-muted-foreground mt-1">Build routines that actually stick.</p>
        </div>
        <Button className="rounded-full shadow-sm"><Plus className="h-4 w-4 mr-2" /> New Habit</Button>
      </div>

      {habits.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">No habits added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {habits.map((habit, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={habit.id}
            >
              <Card className="hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <button 
                    className={`h-16 w-16 rounded-full flex items-center justify-center transition-all ${
                      habit.completedToday ? `${habit.color} text-white shadow-lg` : 'bg-muted border-2 border-dashed border-muted-foreground/30 hover:border-primary'
                    }`}
                  >
                    {habit.completedToday ? <Check className="h-8 w-8" /> : <div className="h-8 w-8" />}
                  </button>
                  <div>
                    <h3 className="font-semibold">{habit.name}</h3>
                    <div className="flex items-center justify-center gap-1 mt-1 text-sm text-muted-foreground">
                      <Flame className={`h-4 w-4 ${habit.streak > 0 ? 'text-orange-500' : ''}`} />
                      <span>{habit.streak} day streak</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
