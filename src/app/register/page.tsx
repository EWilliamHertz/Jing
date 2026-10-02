"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { setAuthCookie } from "@/app/actions"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()

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
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="text-white/50 text-sm">Get started with Jing today.</p>
          </div>

          <form className="space-y-4 mt-8" onSubmit={async (e) => {
            e.preventDefault();
            await setAuthCookie();
            router.push('/dashboard');
          }}>
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
                <input 
                  type="text" 
                  placeholder="Full name" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/30"
                />
              </div>
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
                  placeholder="Create a password" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/30"
                />
              </div>
            </div>

            <Button type="submit" className="w-full rounded-xl h-12 bg-white text-black hover:bg-zinc-200 transition-colors font-semibold text-base mt-6">
              Create Account
            </Button>
            
            <p className="text-xs text-center text-white/40 mt-4 leading-relaxed">
              By clicking "Create Account", you agree to our <br/>
              <Link href="#" className="underline hover:text-white transition-colors">Terms of Service</Link> and <Link href="#" className="underline hover:text-white transition-colors">Privacy Policy</Link>.
            </p>
          </form>

          <p className="text-center text-sm text-white/50">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:underline underline-offset-4 font-medium transition-colors">
              Sign in
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
