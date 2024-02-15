import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Providers } from './components/providers'
import { SignInForm } from './auth/sign-in-form'
import { useState } from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className='h-full' >
            <Navbar />
              <div className='w-full flex flex-row justify-between gap-4 p-4 h-[calc(100%-56px)]'>
                <Sidebar />
                {children}
                <Sidebar />
              </div>

          </div>



        </Providers>
      </body>
    </html>
  )
}
