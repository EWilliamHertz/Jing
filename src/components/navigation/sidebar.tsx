"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  LayoutDashboard, CheckSquare, Target, CheckCircle2, 
  FolderGit2, Wallet, BookOpen, Map, Search, Lightbulb, 
  FileText, Calendar as CalendarIcon, Settings, Users,
  ChevronDown, ChevronRight, BrainCircuit, Sparkles, LogOut
} from "lucide-react"
import { clearAuthCookie } from "@/app/actions"

const navigationGroups = [
  {
    label: "Focus",
    items: [
      { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { title: "Tasks", href: "/tasks", icon: CheckSquare },
      { title: "Calendar", href: "/calendar", icon: CalendarIcon },
    ]
  },
  {
    label: "Growth",
    items: [
      { title: "Goals", href: "/goals", icon: Target },
      { title: "Habits", href: "/habits", icon: CheckCircle2 },
      { title: "Projects", href: "/projects", icon: FolderGit2 },
    ]
  },
  {
    label: "Capture",
    items: [
      { title: "Notes", href: "/notes", icon: FileText },
      { title: "Ideas", href: "/ideas", icon: Lightbulb },
      { title: "Lists", href: "/lists", icon: Search },
    ]
  },
  {
    label: "Life",
    items: [
      { title: "Money", href: "/money", icon: Wallet },
      { title: "Reading", href: "/reading", icon: BookOpen },
      { title: "Travel", href: "/travel", icon: Map },
      { title: "Social", href: "/social", icon: Users },
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()
  
  // Track collapsed state for groups
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (label: string) => {
    setCollapsedGroups(prev => ({ ...prev, [label]: !prev[label] }))
  }
  
  const NavItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href
    return (
      <Link
        href={item.href}
        className={cn(
          "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors z-10",
          isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <item.icon className="h-4 w-4 shrink-0" />
        <span className="truncate">{item.title}</span>
      </Link>
    )
  }

  return (
    <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border h-[100dvh] fixed top-0 left-0 z-40">
      <div className="p-6 flex items-center gap-3 shrink-0">
        <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 bg-gradient-to-br from-primary to-primary/80">
          <span className="text-primary-foreground text-sm font-bold tracking-tighter">J.</span>
        </div>
        <span className="font-semibold tracking-tight text-xl">Jing</span>
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-0 px-3 space-y-6 scrollbar-none pb-6">
        {navigationGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <button 
              onClick={() => toggleGroup(group.label)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider hover:text-muted-foreground transition-colors group"
            >
              <span>{group.label}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", collapsedGroups[group.label] && "-rotate-90")} />
            </button>
            <AnimatePresence initial={false}>
              {!collapsedGroups[group.label] && (
                <motion.nav 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="space-y-0.5 overflow-hidden"
                >
                  {group.items.map((item) => (
                    <NavItem key={item.href} item={item} />
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-border mt-auto space-y-1 shrink-0 bg-card/50 backdrop-blur-md">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border border-transparent hover:border-border"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Search everything</span>
          <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-primary hover:bg-primary/10 transition-colors group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sparkles className="h-4 w-4" />
          <span className="font-medium relative z-10">Jing AI Assistant</span>
        </button>
        <div className="flex items-center justify-between pt-2 mt-2 border-t border-border/50">
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <button
            onClick={async () => {
              await clearAuthCookie()
              window.location.href = '/'
            }}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
          <div className="pr-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  )
}
