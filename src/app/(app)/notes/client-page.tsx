"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Search as SearchIcon } from "lucide-react"
import { addNote } from "@/app/actions"
import { toast } from "sonner"
import { useState, useTransition } from "react"

import { usePrompt } from "@/components/ui/prompt-dialog"
export default function NotesClientPage({ initialNotes }: { initialNotes: any[] }) {
  const notes = initialNotes
  const [query, setQuery] = useState("")
  const { ask } = usePrompt()
  const [isPending, startTransition] = useTransition()

  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(query.toLowerCase()) || n.content.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground mt-1">Lightweight thoughts and documents.</p>
        </div>
        <Button onClick={async () => {
          const title = await ask("Note title:")
          if (title) {
            const content = await ask("Content:")
            if (content) {
              startTransition(() => {
                addNote(title, content)
              })
              toast.success("Note created")
            }
          }
        }} disabled={isPending} className="rounded-full shadow-sm"><Plus className="h-4 w-4 mr-2" /> New Note</Button>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Search notes..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <Card key={note.id} className={`hover:border-primary/50 transition-colors cursor-pointer ${isPending ? 'opacity-70' : ''}`}>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">
                  {note.title}
                </h3>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {note.content}
              </p>
              <p className="text-[10px] text-muted-foreground/60 mt-4">Updated {note.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
