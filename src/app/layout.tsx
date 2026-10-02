import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandPalette } from "@/components/command-palette";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Jing — Your Life, Organized",
  description: "Goals, money, habits, projects, plans and ideas — organized beautifully in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ErrorBoundary>
            {children}
            <CommandPalette />
            <Toaster position="bottom-right" theme="system" />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
