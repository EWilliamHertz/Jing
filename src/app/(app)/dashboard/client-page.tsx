"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TodayTasksWidget } from "@/components/dashboard/today-tasks"
import { HabitsWidget } from "@/components/dashboard/habits-widget"
import { GoalsWidget } from "@/components/dashboard/goals-widget"
import { MoneyWidget } from "@/components/dashboard/money-widget"
import { addTask } from "@/app/actions"
import { toast } from "sonner"
import { useTransition } from "react"
import { usePrompt } from "@/components/ui/prompt-dialog"

export default function DashboardClientPage({ initialTasks, initialHabits, initialGoals, initialMoney }: { initialTasks: any[], initialHabits: any[], initialGoals: any[], initialMoney: any[] }) {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const { ask } = usePrompt()
  const [isPending, startTransition] = useTransition()
  const isLoggedIn = true;
  
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end"
      >
        <div>
          <p suppressHydrationWarning className="text-sm text-muted-foreground mb-1">{currentDate}</p>
          <h1 className="text-3xl font-bold tracking-tight">Good morning{isLoggedIn ? "." : ", Alex."}</h1>
          <p className="text-muted-foreground mt-1">Here's what matters today.</p>
        </div>
        <div className="hidden sm:block">
          <Button onClick={async () => {
            const title = await ask("Enter task title:")
            if (title) {
              const priority = await ask("Priority (High, Medium, Low):", "Medium")
              startTransition(() => {
                addTask({ title, priority: priority || 'Medium', time: 'Anytime', project: 'Inbox', tab: 'today' })
              })
              toast.success("Task created")
            }
          }} disabled={isPending} className="rounded-full shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" /> Add Task</Button>
        </div>
      </motion.div>

      {/* Quick Capture */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative group shadow-sm rounded-xl overflow-hidden border border-border bg-card transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
          <input 
            type="text" 
            disabled={isPending}
            placeholder="What do you want to remember? (e.g. Buy new running shoes next week)"
            className="w-full bg-transparent px-6 py-4 text-sm outline-none placeholder:text-muted-foreground/70 disabled:opacity-50"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value) {
                const title = e.currentTarget.value
                startTransition(() => {
                  addTask({ title, priority: 'Medium', time: 'Anytime', project: 'Inbox', tab: 'today' })
                })
                toast.success("Added to today's tasks")
                e.currentTarget.value = ""
              }
            }}
          />
          <div className="absolute right-2 top-2 bottom-2 flex items-center pr-2 pointer-events-none">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground border border-border/50">
              ↵ Enter
            </kbd>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Today's Tasks */}
        <motion.div 
          className="md:col-span-8 space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TodayTasksWidget tasks={initialTasks} />
        </motion.div>

        {/* Right Column */}
        <motion.div 
          className="md:col-span-4 space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <HabitsWidget habits={initialHabits} />
          <GoalsWidget goals={initialGoals} />
          <MoneyWidget money={initialMoney} />
        </motion.div>
      </div>
    </div>
  )
}
