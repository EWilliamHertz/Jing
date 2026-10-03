"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderGit2, Plus, Clock } from "lucide-react"
import { addProject } from "@/app/actions"
import { useTransition } from "react"
import { usePrompt } from "@/components/ui/prompt-dialog"

export default function ProjectsClientPage({ initialData }: { initialData: any[] }) {
  const projects = initialData
  const { ask } = usePrompt()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Move important things forward.</p>
        </div>
        <Button className="rounded-full shadow-sm" disabled={isPending} onClick={async () => { const title = await ask("Project Title:"); if(title) startTransition(() => addProject(title)) }}><Plus className="h-4 w-4 mr-2" /> New Project</Button>
      </div>
      {projects.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">No projects yet. Create one to get started.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj: any) => (
            <Card key={proj.id} className="hover:border-primary/50 transition-colors cursor-pointer">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FolderGit2 className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{proj.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {proj.description || "No description"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
