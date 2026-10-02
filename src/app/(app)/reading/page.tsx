"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function ReadingPage() {
  const isLoggedIn = useAuth()
  
  const books = isLoggedIn ? [] : [
    { title: "Atomic Habits", author: "James Clear", status: "Reading", progress: "45%" },
    { title: "Deep Work", author: "Cal Newport", status: "Want to read", progress: "0%" },
    { title: "The Psychology of Money", author: "Morgan Housel", status: "Finished", progress: "100%" }
  ]

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reading</h1>
        <p className="text-muted-foreground mt-1">Books, articles, and knowledge.</p>
      </div>
      {books.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">No books in your reading list.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {books.map((book, i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer overflow-hidden">
              <div className="h-24 bg-muted flex items-center justify-center border-b border-border">
                <BookOpen className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{book.author}</p>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="px-2 py-1 bg-muted rounded-md">{book.status}</span>
                  <span>{book.progress}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
