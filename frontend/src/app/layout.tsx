import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from '../lib/providers'
import Navbar from "@/components/layout/Navbar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["400", '700'],
  variable: '--font-popins'
})

export const metadata = {
  title: 'Мой сайт',
  description: 'Next.js App Router пример',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body
        className={` font-roboto flex flex-col min-h-screen bg-gray-100 items-center`}
      >
        <Providers><Navbar /></Providers>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
