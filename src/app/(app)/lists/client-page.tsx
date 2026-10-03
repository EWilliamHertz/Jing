"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Search, Plus } from "lucide-react"
import { useTransition } from "react"
import { usePrompt } from "@/components/ui/prompt-dialog"
import { addList, addListItem, toggleListItem } from "@/app/actions"
import { toast } from "sonner"

export default function ListsClientPage({ initialLists }: { initialLists: any[] }) {
  const lists = initialLists
  const { ask } = usePrompt()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lists</h1>
          <p className="text-muted-foreground mt-1">Shopping, packing, errands and more.</p>
        </div>
        <Button onClick={async () => {
          const title = await ask("List title:")
          if (title) {
            startTransition(() => {
              addList(title)
            })
            toast.success("List created")
          }
        }} disabled={isPending} className="rounded-full shadow-sm"><Plus className="h-4 w-4 mr-2" /> New List</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {lists.map((list) => (
          <Card key={list.id} className={isPending ? 'opacity-70' : ''}>
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-lg">{list.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {list.items.map((item: any, idx: number) => (
                <div key={item.id || idx} className="flex items-center gap-3">
                  <button onClick={() => startTransition(() => toggleListItem(item.id, item.done))} className="focus:outline-none shrink-0">
                    {item.done ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>
                  <span className={`text-sm ${item.done ? 'line-through text-muted-foreground' : ''}`}>
                    {item.name}
                  </span>
                </div>
              ))}
              <div className="pt-2">
                <Button onClick={async () => {
                  const itemName = await ask("Item name:")
                  if (itemName) {
                    startTransition(() => {
                      addListItem(list.id, itemName)
                    })
                  }
                }} variant="ghost" size="sm" className="w-full text-muted-foreground justify-start h-8 px-2">
                  <Plus className="h-4 w-4 mr-2" /> Add item
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
