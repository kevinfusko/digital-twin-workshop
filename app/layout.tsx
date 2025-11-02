import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Digital Twin RAG System',
  description: 'AI-Powered Professional Profile Assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        <div className="min-h-screen p-5">
          {children}
        </div>
      </body>
    </html>
  )
}
