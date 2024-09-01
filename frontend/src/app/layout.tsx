import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Espace",
  description: "Emil space, a place for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen flex-col">
        <Navbar />
        <div className="flex-grow p-6 justify-center items-center h-full md:overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
