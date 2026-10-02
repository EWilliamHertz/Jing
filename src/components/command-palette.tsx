"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Sparkles, Plus, Calendar, Target, CheckSquare, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen((open) => !open)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    const openPalette = () => setIsOpen(true)
    
    window.addEventListener("keydown", down)
    window.addEventListener("open-command-palette", openPalette)
    
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("open-command-palette", openPalette)
    }
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh]">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl mx-4 z-50"
        >
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="mr-3 h-5 w-5 text-muted-foreground" />
            <input 
              autoFocus
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ask Jing AI or search anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-none">
            {query.length > 0 ? (
              <div className="p-4 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Ask Jing AI</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                  "{query}"
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Suggestions</div>
                {[
                  { icon: Plus, label: "Add new task", sub: "Tasks", action: () => router.push('/tasks') },
                  { icon: Target, label: "Create a goal", sub: "Goals", action: () => router.push('/goals') },
                  { icon: Calendar, label: "Plan my week", sub: "Calendar", action: () => router.push('/calendar') },
                  { icon: Sparkles, label: "What should I focus on today?", sub: "Jing AI", action: () => { setQuery("What should I focus on today?"); } },
                ].map((item, i) => (
                  <button 
                    key={i}
                    className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground text-left"
                    onClick={() => {
                      item.action()
                      if (!item.action.toString().includes("setQuery")) {
                        setIsOpen(false)
                      }
                    }}
                  >
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{item.sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  )
}
