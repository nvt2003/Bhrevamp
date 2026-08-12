import React from 'react'
import Header from '@/app/(frontend)/components/Header'
import './styles.css'
import Navbar from './components/Navbar'
import HeaderResponsive from './components/HeaderResponsive'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* <Header />
        <Navbar /> */}
        <HeaderResponsive />
        <main>{children}</main>
      </body>
    </html>
  )
}
