"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar as CalendarIcon } from "lucide-react"

export default function TravelPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Travel</h1>
        <p className="text-muted-foreground mt-1">Keep trips and itineraries organized.</p>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold">Stockholm Weekend</h3>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2 mb-6">
            <CalendarIcon className="h-4 w-4" /> June 14–16
          </p>
          <div className="space-y-4">
            <div className="border-l-2 border-primary/30 pl-4 py-2">
              <h4 className="font-semibold text-sm">Day 1: Arrival & Old Town</h4>
              <p className="text-xs text-muted-foreground mt-1">Check into hotel, walk around Gamla Stan, dinner at local restaurant.</p>
            </div>
            <div className="border-l-2 border-muted pl-4 py-2">
              <h4 className="font-semibold text-sm">Day 2: Museums</h4>
              <p className="text-xs text-muted-foreground mt-1">Vasa Museum, ABBA museum, and boat tour.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
