import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'
const inter = Inter({ subsets: ['latin'] })

  export const metadata ={
    title : "QuietVibe",
    description :"A Nextjs Social Media"
  }
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
<ClerkProvider>

    <html lang="en">
      <body className={`inter.className} bg-dark-1`}>
        <Topbar />
           <main className="flex flex-row">
          <LeftSidebar/>
          <section className="main-container ">
            <div className="w-fullmax-w-4xl ">{children}</div>
          </section>
          <RightSidebar/>
        </main>
        <Bottombar/>
</body>
    </html>

</ClerkProvider>

  )
}
