import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import Sidebar from "./_components/sidebar";

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "Stockly Dev",
  description:
    "A stock market dashboard built with Next.js 13 and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-dvh w-full">
          <Sidebar variant="desktop" />
          <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
