"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Flame, Check } from "lucide-react"
import { addHabit } from "@/app/actions"
import { useTransition } from "react"
import { usePrompt } from "@/components/ui/prompt-dialog"

export default function HabitsClientPage({ initialData }: { initialData: any[] }) {
  
  const habits = initialData
  const { ask } = usePrompt()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Habits</h1>
          <p className="text-muted-foreground mt-1">Build routines that actually stick.</p>
        </div>
        <Button className="rounded-full shadow-sm" disabled={isPending} onClick={async () => { const title = await ask("Habit Title:"); if(title) startTransition(() => addHabit(title, "0")) }}><Plus className="h-4 w-4 mr-2" /> New Habit</Button>
      </div>

      {habits.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">No habits added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {habits.map((habit: any, i: number) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={habit.id}
            >
              <Card className="hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg bg-primary/20`}>
                      <Flame className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{habit.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Streak: {habit.streak || "0"}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
