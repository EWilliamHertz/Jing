"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { 
  ArrowRight, Target, Wallet, CheckCircle2, 
  CheckSquare, BookOpen, Map, Lightbulb, Search, 
  Layers
} from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import { GoalsWidget } from "@/components/dashboard/goals-widget"
import { MoneyWidget } from "@/components/dashboard/money-widget"
import { HabitsWidget } from "@/components/dashboard/habits-widget"
import { TodayTasksWidget } from "@/components/dashboard/today-tasks"

const features = [
  {
    id: "goals",
    title: "Goals",
    description: "Turn ambitions into achievable plans. Track milestones and celebrate progress.",
    icon: Target,
    color: "from-blue-500 to-indigo-500",
    ui: <div className="dark"><GoalsWidget /></div>
  },
  {
    id: "money",
    title: "Money",
    description: "Understand where your money goes without the spreadsheet anxiety.",
    icon: Wallet,
    color: "from-emerald-400 to-green-600",
    ui: <div className="dark"><MoneyWidget /></div>
  },
  {
    id: "habits",
    title: "Habits",
    description: "Build routines that actually stick. Gentle nudges, zero guilt.",
    icon: CheckCircle2,
    color: "from-amber-400 to-orange-500",
    ui: <div className="dark"><HabitsWidget /></div>
  },
  {
    id: "unified",
    title: "All in one place.",
    description: "No more switching between 10 different apps. Your entire life, beautifully organized in a single system.",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
    ui: (
      <div className="relative h-full w-full flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
        <div className="relative w-full shadow-2xl scale-90 dark">
          <TodayTasksWidget />
        </div>
      </div>
    )
  }
]

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // We have 4 features, so divide the scroll progress into 4 segments
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0)

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Calculate which feature should be active based on scroll
      if (typeof latest !== 'number' || isNaN(latest)) return;
      const index = Math.max(0, Math.min(
        Math.floor(latest * features.length),
        features.length - 1
      ))
      setActiveFeatureIndex(index)
    })
  }, [scrollYProgress])

  const activeFeature = features[activeFeatureIndex] || features[0]

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-white flex items-center justify-center">
              <span className="text-black text-xs font-bold">J</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">Jing</span>
          </div>
          
          <nav className="flex gap-4 text-xs sm:text-sm sm:gap-6 font-medium text-white/60">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Log in</Link>
            <Button size="sm" asChild className="rounded-full bg-white text-black hover:bg-white/90">
              <Link href="/register">
                Start your Jing
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium mb-8">
            <SparklesIcon className="h-3 w-3" /> Introducing the new standard
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Your life.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-white">
              Organized.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-12 font-light">
            Goals, money, habits, projects, plans and ideas — finally gathered in one beautiful place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="rounded-full h-14 px-8 text-base bg-white text-black hover:bg-zinc-200 transition-all">
              <Link href="/dashboard">
                Enter Dashboard
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase animate-pulse">
          Scroll to explore
          <div className="h-4 w-[1px] bg-white/30 mt-2" />
        </div>
      </section>

      {/* Interactive Scroll Section */}
      <section id="features" ref={containerRef} className="relative h-[400vh] bg-black">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* Background Ambient Glow */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 bg-gradient-to-br ${activeFeature.color} blur-[120px] rounded-full pointer-events-none`}
            />
          </AnimatePresence>

          <div className="container mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
            
            {/* Left side text */}
            <div className="space-y-8 pl-10">
              <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    {(() => {
                      const Icon = activeFeature.icon;
                      return <Icon className="h-6 w-6 text-white" />;
                    })()}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="relative h-[120px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                      {activeFeature.title}
                    </h2>
                    <p className="text-xl text-white/50 leading-relaxed">
                      {activeFeature.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right side UI Mockup / Modal */}
            <div className="relative h-[400px] w-full max-w-md mx-auto perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, rotateX: 20, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateX: -20, y: -40, scale: 0.9 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-full bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                    {/* Glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    
                    {activeFeature.ui}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {features.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 rounded-full transition-all duration-500 ${
                  i === activeFeatureIndex ? "h-8 bg-white" : "h-2 bg-white/20"
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-black relative overflow-hidden border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Ready to simplify?
          </h2>
          <p className="text-xl text-white/50 mb-12">
            Join thousands of others organizing their life with Jing.
          </p>
          <Button size="lg" asChild className="rounded-3xl h-auto py-5 px-10 text-lg bg-white text-black hover:bg-zinc-200 hover:scale-105 transition-all flex-col gap-2">
            <Link href="/register">
              <span>Start your Jing</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function SparklesIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  )
}
