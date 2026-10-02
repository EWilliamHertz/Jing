"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageSquare, Heart, Share2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function SocialPage() {
  const isLoggedIn = useAuth()
  const posts = isLoggedIn ? [] : [1, 2, 3]

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social</h1>
        <p className="text-muted-foreground mt-1">Connect with friends and share your journey.</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-center py-12 text-sm">No recent activity from your network.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Alex Johnson</h4>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-sm mb-4">
                    Just hit a 30-day streak on my morning meditation habit using Jing! Feeling more focused than ever. 🧘‍♂️✨
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground border-t border-border pt-4">
                    <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Heart className="h-4 w-4" /> 24
                    </button>
                    <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <MessageSquare className="h-4 w-4" /> 5
                    </button>
                    <button className="flex items-center gap-2 hover:text-primary transition-colors ml-auto">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
