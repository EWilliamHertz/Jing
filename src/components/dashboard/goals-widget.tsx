"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export function GoalsWidget() {
  const isLoggedIn = useAuth()

  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" /> Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 space-y-4">
        {isLoggedIn ? (
          <p className="text-sm text-muted-foreground text-center py-2">No active goals.</p>
        ) : (
          <div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium">Launch my business</span>
              <span className="text-xs font-semibold text-primary">68%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '68%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              Next: Complete website
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
