"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar as CalendarIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addTravel } from "@/app/actions"
import { useTransition } from "react"
import { usePrompt } from "@/components/ui/prompt-dialog"

export default function TravelClientPage({ initialData }: { initialData: any[] }) {
  const { ask } = usePrompt()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Travel</h1>
          <p className="text-muted-foreground mt-1">Keep trips and itineraries organized.</p>
        </div>
        <Button className="rounded-full shadow-sm" disabled={isPending} onClick={async () => { const dest = await ask("Destination:"); if(dest) startTransition(() => addTravel(dest)) }}>
          <Plus className="h-4 w-4 mr-2" /> Add Trip
        </Button>
      </div>
      
      <div className="grid gap-6">
        {initialData.length === 0 ? (
          <p className="text-muted-foreground text-center py-12 text-sm">No upcoming trips planned.</p>
        ) : (
          initialData.map((trip: any) => (
            <Card key={trip.id}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{trip.destination}</h3>
                {trip.date && <p className="text-sm text-muted-foreground">{trip.date}</p>}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
