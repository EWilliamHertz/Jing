"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"

export default function CalendarPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 h-full flex flex-col">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-1">Your time, visualized.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-card border border-border rounded-lg overflow-hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="px-4 text-sm font-medium">October 2026</span>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none border-l border-border"><ChevronRight className="h-4 w-4" /></Button>
          </div>
          <Button className="rounded-full shadow-sm"><Plus className="h-4 w-4 mr-2" /> Event</Button>
        </div>
      </div>

      <Card className="flex-1 min-h-[500px]">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="grid grid-cols-7 border-b border-border bg-muted/30">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-2 text-center text-xs font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 flex-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <div key={i} className={`min-h-[100px] border-b border-r border-border p-2 ${i % 7 === 6 ? 'border-r-0' : ''} ${i > 27 ? 'border-b-0' : ''}`}>
                <span className={`text-sm font-medium ${i === 15 ? 'bg-primary text-primary-foreground h-6 w-6 rounded-full flex items-center justify-center' : 'text-muted-foreground'}`}>
                  {(i % 31) + 1}
                </span>
                {i === 15 && (
                  <div className="mt-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded border border-primary/30 truncate">
                    Dental Appt
                  </div>
                )}
                {i === 18 && (
                  <div className="mt-2 px-2 py-1 bg-blue-500/20 text-blue-500 text-xs rounded border border-blue-500/30 truncate">
                    Team Sync
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
