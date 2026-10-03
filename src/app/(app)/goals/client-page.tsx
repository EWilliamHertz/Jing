"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Plus, CheckCircle2, Circle, Edit2, Trash2 } from "lucide-react"
import { addGoal, addGoalTask, toggleGoalTask, updateGoalTaskProgress, editGoal, deleteGoal } from "@/app/actions"
import { useTransition } from "react"
import { usePrompt } from "@/components/ui/prompt-dialog"

export default function GoalsClientPage({ initialData }: { initialData: any[] }) {
  const goals = initialData;
  const { ask } = usePrompt()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
          <p className="text-muted-foreground mt-1">Turn ambitions into achievable plans.</p>
        </div>
        <Button className="rounded-full shadow-sm" disabled={isPending} onClick={async () => { const title = await ask("Goal Title:"); if(title) startTransition(() => addGoal(title, "0")) }}><Plus className="h-4 w-4 mr-2" /> New Goal</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {goals.map((goal: any, i: number) => (
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
                  <div className="flex items-center gap-3">
                    <button disabled={isPending} className="text-muted-foreground hover:text-primary transition-colors" onClick={async () => {
                      const newTitle = await ask({ title: "Edit Goal Title", defaultValue: goal.title });
                      if (newTitle) {
                        const newProgress = await ask({ title: "Edit Progress (%)", defaultValue: goal.progress || "0" });
                        if (newProgress !== null) {
                          startTransition(() => editGoal(goal.id, newTitle, newProgress));
                        }
                      }
                    }}>
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button disabled={isPending} className="text-muted-foreground hover:text-destructive transition-colors" onClick={async () => {
                      const confirmDelete = await ask("Type 'delete' to confirm:");
                      if (confirmDelete === 'delete') {
                        startTransition(() => deleteGoal(goal.id));
                      }
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-bold text-primary">{goal.progress || "0"}%</span>
                  </div>
                </div>
                <CardTitle className="mt-4">{goal.title}</CardTitle>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${goal.progress || 0}%` }} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tasks</h4>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" disabled={isPending} onClick={async () => { const title = await ask("New Task:"); if(title) startTransition(() => addGoalTask(goal.id, title, "")) }}>
                    <Plus className="h-3 w-3 mr-1" /> Add Task
                  </Button>
                </div>
                <div className="space-y-3">
                  {(goal.tasks || []).map((m: any, idx: number) => (
                    <div key={m.id} className="flex items-center gap-3 text-sm">
                      <button disabled={isPending} onClick={() => startTransition(() => toggleGoalTask(m.id, m.done))} className="shrink-0">
                        {m.done ? (
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                      <span className={m.done ? 'text-muted-foreground line-through flex-1' : 'font-medium flex-1'}>{m.title}</span>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          placeholder="qty/progress" 
                          className="w-16 bg-transparent border-b border-border outline-none text-xs text-right focus:border-primary disabled:opacity-50" 
                          defaultValue={m.progress || ""}
                          disabled={isPending}
                          onBlur={(e) => {
                            if (e.target.value !== m.progress) {
                              startTransition(() => updateGoalTaskProgress(m.id, e.target.value))
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') e.currentTarget.blur()
                          }}
                        />
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">DONE</span>
                      </div>
                    </div>
                  ))}
                  {(goal.tasks || []).length === 0 && (
                     <p className="text-xs text-muted-foreground italic">No tasks added yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
