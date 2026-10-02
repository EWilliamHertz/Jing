import { Sidebar } from "@/components/navigation/sidebar"
import { MobileNav } from "@/components/navigation/mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[100dvh] bg-background text-foreground md:pl-64">
      <Sidebar />
      <main className="flex-1 flex flex-col h-[100dvh] overflow-hidden">
        <MobileNav />
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </div>
      </main>
    </div>
  )
}
