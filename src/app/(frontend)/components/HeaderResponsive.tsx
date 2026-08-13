'use client'

import React from 'react'
import HeaderDesktop from './Header' // Component Header PC của bạn
import NavbarDesktop from './Navbar' // Component Navbar PC của bạn
import MobileHeader from './MobileHeader' // Component Mobile vừa viết

export default function HeaderResponsive() {
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
    </>
  )
}
