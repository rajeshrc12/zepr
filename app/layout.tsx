import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import QueryProvider from "@/providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font",
  weight: ["400", "500", "600", "700"], // add weights here
});

export const metadata: Metadata = {
  title: "Zepr - AI Data Analyst",
  description: "AI Data Analyst",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <QueryProvider>
          <main>{children}</main>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
