"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Clock } from "lucide-react"
import { toggleTask } from "@/app/actions"
import { useTransition, useState } from "react"
import Link from "next/link"

export function TodayTasksWidget({ tasks = [] }: { tasks?: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set())
  const todayTasks = tasks.filter(t => t.tab === 'today')
  const remaining = todayTasks.filter(t => !t.done).length

  const toggleExpand = (id: string) => {
    const next = new Set(expandedTasks)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setExpandedTasks(next)
  }

  return (
    <Card className={`h-full bg-card text-card-foreground ${isPending ? 'opacity-70' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-0.5">
          <CardTitle className="text-lg">Today's Tasks</CardTitle>
          <CardDescription>{remaining} remaining out of {todayTasks.length}</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hidden sm:inline-flex" asChild>
          <Link href="/tasks">View all</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-2 pt-4">
        {todayTasks.slice(0, 4).map((item) => (
          <div key={item.id} className={`flex items-start gap-4 p-3 rounded-lg transition-colors hover:bg-muted/50 ${item.done ? 'opacity-60' : ''}`}>
            <button disabled={isPending} onClick={() => startTransition(() => toggleTask(item.id, item.done))} className="mt-0.5 focus:outline-none shrink-0">
              {item.done ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              )}
            </button>
            <div className="flex-1 space-y-1 min-w-0 cursor-pointer" onClick={() => toggleExpand(item.id)}>
              <p className={`text-sm font-medium leading-relaxed ${expandedTasks.has(item.id) ? '' : 'truncate'} ${item.done ? 'line-through text-muted-foreground' : ''}`}>
                {item.title}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1 shrink-0"><Clock className="h-3 w-3" /> {item.time}</span>
                <span className={`px-1.5 py-0.5 rounded-sm text-[10px] font-medium shrink-0
                  ${item.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                    item.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                  {item.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
        {todayTasks.length === 0 && (
          <p className="text-sm text-muted-foreground py-4 text-center">No tasks for today. Enjoy your day!</p>
        )}
      </CardContent>
    </Card>
  )
}
