"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderGit2, Plus, Clock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function ProjectsPage() {
  const isLoggedIn = useAuth()
  const projects = isLoggedIn ? [] : [1, 2]

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Move important things forward.</p>
        </div>
        <Button className="rounded-full shadow-sm"><Plus className="h-4 w-4 mr-2" /> New Project</Button>
      </div>
      {projects.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">No projects yet. Create one to get started.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FolderGit2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-muted rounded-full">In Progress</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{i === 1 ? "LifeStack Redesign" : "Summer Vacation"}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {i === 1 ? "Redesigning the entire application interface for 2027." : "Planning the itinerary and booking flights."}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Updated today</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
