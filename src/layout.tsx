import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/client-providers" // Import the new provider

const inter = Inter({ subsets: ["latin"] })

// Next.js will automatically create the link tags from this object
export const metadata: Metadata = {
  title: "Educator CV Builder",
  description: "Build your professional educator CV with our drag and drop builder",
  icons: {
    icon: "/favicon.ico", // Path to the icon in your /public folder
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // REMOVED: suppressHydrationWarning. We fix errors, not hide them.
    <html lang="en">
      <body className={inter.className}>
        {/* This is the correct pattern.
            The server layout renders the Providers client component,
            which then safely renders the children.
        */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
