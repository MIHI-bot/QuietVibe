import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import React from "react";
import '../globals.css';
 

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({children}: {children: React.ReactNode}){
    return (
<ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>
                    {children} 
                    </body>
            </html>
</ClerkProvider>
      
    )
  }