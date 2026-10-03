"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Plus, Clock, Tag, Trash2 } from "lucide-react"
import { addTask, toggleTask, removeTask } from "@/app/actions"
import { toast } from "sonner"

import { usePrompt } from "@/components/ui/prompt-dialog"
export default function TasksClientPage({ initialTasks }: { initialTasks: any[] }) {
  const [activeTab, setActiveTab] = useState("today")
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set())
  const { ask } = usePrompt()
  const [isPending, startTransition] = useTransition()
  const tasks = initialTasks

  const filteredTasks = tasks.filter(t => activeTab === "all" || t.tab === activeTab)

  const toggleExpand = (id: string) => {
    const next = new Set(expandedTasks)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpandedTasks(next)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage your day-to-day actions.</p>
        </div>
        <Button 
          className="rounded-full shadow-sm"
          disabled={isPending}
          onClick={async () => {
            const title = await ask("Enter task title:")
            if (title) {
              const priority = await ask("Priority (High, Medium, Low):", "Medium")
              startTransition(() => {
                addTask({
                  title,
                  priority: priority || 'Medium',
                  time: 'Anytime',
                  project: 'Inbox',
                  tab: activeTab === 'all' ? 'today' : activeTab
                })
              })
            }
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> New Task
        </Button>
      </div>

      <div className="flex gap-6 border-b border-border">
        {['today', 'upcoming', 'all'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-medium transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div layoutId="task-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4 pb-20">
        {filteredTasks.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-12">No tasks found for this view.</p>
        ) : (
          filteredTasks.map((task, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={task.id}
            >
              <Card className={`group hover:border-primary/50 transition-colors ${isPending ? 'opacity-50' : ''}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <button onClick={() => startTransition(() => toggleTask(task.id, task.done))} className="focus:outline-none shrink-0">
                    {task.done ? (
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleExpand(task.id)}>
                    <p className={`text-base font-medium leading-relaxed ${expandedTasks.has(task.id) ? '' : 'truncate'} ${task.done ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1 shrink-0"><Clock className="h-3 w-3" /> {task.time}</span>
                      <span className="flex items-center gap-1 truncate"><Tag className="h-3 w-3 shrink-0" /> <span className="truncate">{task.project}</span></span>
                      <span className={`px-1.5 py-0.5 rounded-sm text-[10px] font-medium shrink-0 
                        ${task.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                          task.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => startTransition(() => removeTask(task.id))} className="opacity-0 group-hover:opacity-100 focus:outline-none shrink-0 p-2 text-muted-foreground hover:text-destructive transition-all">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
