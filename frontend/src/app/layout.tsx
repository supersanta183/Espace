"use client";
import { Inter } from "next/font/google";
import "./globals.css";

import LoggedInProvider from "@/Contexts/LoggedInProvider";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LoggedInProvider>
        <body className="flex h-screen flex-col">
          <Navbar />
          <div className="flex-grow p-6 justify-center items-center h-full md:overflow-y-auto">
            {children}
          </div>
        </body>
      </LoggedInProvider>
    </html>
  );
}
