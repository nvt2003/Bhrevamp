'use client'

import React from 'react'
import HeaderDesktop from './Header'
import NavbarDesktop from './Navbar'
import MobileHeader from './MobileHeader'
import NewsSlider from './NewsSlider'
export default function HeaderResponsive({ data }: { data: any }) {
  return (
    <>
      {/* 1. GIAO DIỆN MOBILE (Chỉ hiện từ màn hình nhỏ đến dưới 768px - md) */}
      <div className="block md:hidden">
        <MobileHeader />
      </div>

      {/* 2. GIAO DIỆN DESKTOP (Chỉ hiện từ màn hình md = 768px trở lên) */}
      <div className="hidden md:block">
        <HeaderDesktop />
        <NavbarDesktop />
      </div>

      {/* Slide bài viết trượt ngang */}
      <NewsSlider sliders={data?.sliders ?? []} />
    </>
  )
}
