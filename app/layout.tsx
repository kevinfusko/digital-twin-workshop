import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kevin Fuschetto | Software Engineer',
  description: 'Brisbane-based Software Engineer specializing in .NET development and IT infrastructure',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
