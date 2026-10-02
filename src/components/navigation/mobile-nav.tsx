"use client"

import { useState } from "react"
import { Menu, X, LayoutDashboard, CheckSquare, Target, CheckCircle2, FolderGit2, Wallet, BookOpen, Map, Search, Lightbulb, FileText, Calendar as CalendarIcon, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

const mainNav = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Tasks", href: "/tasks", icon: CheckSquare },
  { title: "Goals", href: "/goals", icon: Target },
  { title: "Habits", href: "/habits", icon: CheckCircle2 },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center shadow-sm">
          <span className="text-primary-foreground text-[10px] font-bold">J</span>
        </div>
        <span className="font-semibold text-sm">Jing</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}>
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-semibold">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <nav className="space-y-2">
                {mainNav.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-lg text-sm ${pathname === item.href ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'}`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between mt-auto shrink-0 bg-card">
              <Link href="/settings" onClick={() => setOpen(false)} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Settings className="h-5 w-5" /> Settings
              </Link>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
