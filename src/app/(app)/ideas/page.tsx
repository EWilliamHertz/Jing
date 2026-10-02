"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Plus, Tag } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function IdeasPage() {
  const isLoggedIn = useAuth()
  
  const ideas = isLoggedIn ? [] : [
    { title: "Start a podcast about design", category: "Creative", time: "2 hours ago" },
    { title: "Mobile app for tracking house plants", category: "Business", time: "Yesterday" },
    { title: "Learn conversational Italian", category: "Learning", time: "Oct 1" },
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ideas</h1>
          <p className="text-muted-foreground mt-1">Never lose a good thought.</p>
        </div>
      </div>
      
      <div className="relative group shadow-sm rounded-xl overflow-hidden border border-border bg-card focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
        <textarea 
          placeholder="Capture an idea quickly..."
          className="w-full bg-transparent px-6 py-4 text-sm outline-none placeholder:text-muted-foreground/70 resize-none min-h-[100px]"
        />
        <div className="absolute right-4 bottom-4">
          <Button size="sm" className="rounded-full"><Plus className="h-4 w-4 mr-1" /> Save</Button>
        </div>
      </div>

      {ideas.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">No ideas captured yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea, i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer bg-card/50">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <Lightbulb className="h-5 w-5 text-yellow-500 mb-3" />
                  <h3 className="font-semibold text-lg leading-tight mb-2">{idea.title}</h3>
                </div>
                <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground pt-4 border-t border-border">
                  <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {idea.category}</span>
                  <span>{idea.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
