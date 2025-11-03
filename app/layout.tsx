import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";

import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // optional custom CSS variable
});

export const metadata: Metadata = {
  title: "Zepr",
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
