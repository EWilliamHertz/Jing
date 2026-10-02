import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="bg-black min-h-screen text-white pt-24 pb-32">
      <div className="container mx-auto max-w-5xl px-6">
        <Link href="/" className="text-white/50 hover:text-white mb-12 inline-block">← Back to home</Link>
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Simple, transparent pricing.</h1>
          <p className="text-xl text-white/50">Start organizing your life for free. Upgrade when you need more power.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="border border-white/10 bg-white/5 rounded-3xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-2">Free</h2>
            <p className="text-white/50 mb-6">Everything you need to get started.</p>
            <div className="text-4xl font-bold mb-8">$0<span className="text-lg font-normal text-white/50">/mo</span></div>
            <ul className="space-y-4 mb-8">
              {["Personal life dashboard", "Basic goals & tasks", "Habits tracker", "Notes module"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white/50" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full h-12 rounded-full bg-white/10 hover:bg-white/20 text-white">Join the waitlist</Button>
          </div>

          {/* Plus Tier */}
          <div className="border border-indigo-500/30 bg-indigo-500/10 rounded-3xl p-8 backdrop-blur-xl relative">
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              RECOMMENDED
            </div>
            <h2 className="text-2xl font-bold mb-2">Jing Plus</h2>
            <p className="text-white/50 mb-6">For the power organizer.</p>
            <div className="text-4xl font-bold mb-8">$8<span className="text-lg font-normal text-white/50">/mo</span></div>
            <ul className="space-y-4 mb-8">
              {["Unlimited everything", "Jing AI assistant", "Advanced insights", "Custom dashboards", "Priority support"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full h-12 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white">Join the waitlist</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
