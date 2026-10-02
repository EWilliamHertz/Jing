"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
      {/* Top Nav */}
      <div className="p-6">
        <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/10 hover:text-white rounded-full">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-sm space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-xl shadow-2xl">
              <span className="text-white font-bold text-xl tracking-tighter">J.</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-white/50 text-sm">Enter your details to sign in to Jing.</p>
          </div>

          <form className="space-y-4 mt-8" onSubmit={(e) => {
            e.preventDefault();
            window.location.href = '/dashboard';
          }}>
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
                <input 
                  type="email" 
                  placeholder="Email address" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/30"
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/30"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded bg-white/10 border-white/20 text-white focus:ring-white focus:ring-offset-black" />
                <span className="text-white/60 group-hover:text-white transition-colors">Remember me</span>
              </label>
              <Link href="#" className="text-white/60 hover:text-white transition-colors underline-offset-4 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full rounded-xl h-12 bg-white text-black hover:bg-zinc-200 transition-colors font-semibold text-base mt-6">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-white/50">
            Don't have an account?{' '}
            <Link href="/register" className="text-white hover:underline underline-offset-4 font-medium transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
      
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
      </div>
    </div>
  )
}
