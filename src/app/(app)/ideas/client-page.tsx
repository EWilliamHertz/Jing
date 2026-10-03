"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Plus, Tag } from "lucide-react"
import { addIdea } from "@/app/actions"
import { useTransition, useRef } from "react"

export default function IdeasClientPage({ initialData }: { initialData: any[] }) {
  
  const ideas = initialData
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLTextAreaElement>(null)

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
          ref={inputRef} className="w-full bg-transparent px-6 py-4 text-sm outline-none placeholder:text-muted-foreground/70 resize-none min-h-[100px]"
        />
        <div className="absolute right-4 bottom-4">
          <Button size="sm" className="rounded-full" disabled={isPending} onClick={() => { if(inputRef.current?.value) { startTransition(() => addIdea(inputRef.current!.value)); inputRef.current.value = ""; } }}><Plus className="h-4 w-4 mr-1" /> Save</Button>
        </div>
      </div>

      {ideas.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">No ideas captured yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea: any, idx: number) => (
            <Card key={idea.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <p className="text-sm leading-relaxed">{idea.content}</p>
                <div className="flex items-center justify-between mt-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><Lightbulb className="h-3 w-3" /> Idea</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
