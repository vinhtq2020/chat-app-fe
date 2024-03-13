import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Providers } from './components/providers'
import { SignInForm } from './auth/sign-in-form'
import { useState } from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import { checkAuthentication } from './utils/auth'
import { Modal } from './components/modal/modal'
import { redirect, useSearchParams } from 'next/navigation'
import AlertModal from './components/toast/toast'

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
  const isLogin = checkAuthentication()
  
  return (
    <html lang="en">
      <body>
        <Providers>
          {!isLogin ? <SignInForm/> :
            <div className='h-full' >
              <Navbar />
              <div className='w-full flex flex-row justify-between gap-4 p-4 h-[calc(100%-56px)]'>
                <Sidebar />
                {children}
                <Sidebar />
              </div>

            </div>
          }
          <div id='portal-modal'></div>
          <AlertModal/>
        </Providers>
      </body>
    </html>
  )
}