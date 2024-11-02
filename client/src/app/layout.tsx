import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import {ModeToggle} from "@/components/mode-toggle";
import {MobileSidebar} from "@/components/mobile-sidebar";
import {Sidebar} from "@/components/sidebar";
import { Search, Music, User2Icon } from "lucide-react";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen min-w-full bg-background max-h-screen">
          <div className="h-[65px] md:pl-80 fixed inset-y-0 w-full z-50">
            <nav className="flex justify-between items-center border-b border-border px-4 py-4">
              <MobileSidebar />
              <div className="hidden md:flex w-72 bg-transparent dark:bg-transparent relative pointer-events-auto">
                <button className="w-full lg:flex items-center text-sm leading-6 transition-colors text-slate-400 rounded-md ring-1 ring-cyan-300/20 shadow-sm py-1.5 pl-2 pr-3 hover:ring-cyan-300/40 dark:bg-inherit dark:highlight-white/5 dark:hover:bg-inherit">
                  <Music size={18} className="mr-6" />
                  Search Utils.io...
                  <span className="ml-auto pl-3 flex-none text-xs font-semibold">
                    <Search size={18} />
                  </span>
                </button>
              </div>
              <div className="flex gap-4 items-center">
                <ModeToggle />
                <User2Icon size={18} className="ml-6"  />
              </div>
            </nav>
          </div>
          <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
            <Sidebar />
          </div>
          <main className="md:pl-80 pt-[65px] flex h-full w-full flex-grow">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
