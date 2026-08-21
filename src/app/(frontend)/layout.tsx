import React from 'react'
import './styles.css'
import HeaderResponsive from './components/HeaderResponsive'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Footer from './components/Footer'
import { getCachedHeader } from '@/lib/getHeader'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  //Khởi tạo instance Local API
  const payload = await getPayload({ config: configPromise })
  //Query dữ liệu Global Footer
  const footerData = await payload.findGlobal({
    slug: 'footer',
  })
  const headerData = await getCachedHeader()
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* <Header />
        <Navbar /> */}
        <HeaderResponsive data={headerData} />
        <main>{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  )
}
