import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import { AuthProvider } from "@/lib/auth-context";
import { PromptProvider } from "@/components/ui/prompt-dialog";

export const metadata: Metadata = {
  title: "Jing — Your Life, Organized",
  description: "Goals, money, habits, projects, plans and ideas — organized beautifully in one place.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get('auth')?.value === 'true';

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <AuthProvider isLoggedIn={isLoggedIn}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <PromptProvider>
              <ErrorBoundary>
                {children}
                <CommandPalette />
                <Toaster position="bottom-right" theme="system" />
              </ErrorBoundary>
            </PromptProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
