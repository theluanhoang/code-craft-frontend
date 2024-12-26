import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import Head from "next/head"

import "./globals.scss"

const fireCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Git | Code Craft",
  description: "Generated by code craft",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="icon.ico" />
      </Head>
      <body className={`${fireCode.variable} antialiased`}>{children}</body>
    </html>
  )
}
