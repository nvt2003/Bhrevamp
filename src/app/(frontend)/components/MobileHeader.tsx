'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { User, Menu, X, Plus, Sun, Moon, Image as ImageIcon } from 'lucide-react'

// --- SOCIAL ICONS COMPONENTS ---
const FacebookIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const XTwitterIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const InstagramIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.161-2.759 6.161-6.163c0-3.403-2.758-6.162-6.161-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const YoutubeIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const LinkedinIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const TikTokIcon = ({ className = 'w-3.5 h-3.5' }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.56-1.27 2.56.02.85.45 1.67 1.14 2.16.82.59 1.91.73 2.87.39.91-.31 1.63-1.07 1.88-2.01.12-.55.12-1.12.12-1.68V0z" />
  </svg>
)

// DANH SÁCH DANH MỤC
const defaultCategories = [
  { name: 'Berita', slug: 'berita', hasSub: true },
  { name: 'Sukan', slug: 'sukan', hasSub: true },
  { name: 'Hiburan', slug: 'hiburan', hasSub: true },
  { name: 'Dunia', slug: 'dunia', hasSub: true },
  { name: 'Bisnes', slug: 'bisnes', hasSub: true },
  { name: 'Rencana', slug: 'rencana', hasSub: true },
  { name: 'Gaya Hidup', slug: 'gaya-hidup', hasSub: true },
  { name: '#Marilokal', slug: 'marilokal', hasSub: false },
  { name: '1Klassifieds', slug: '1klassifieds', hasSub: false },
]

export default function MobileHeader({
  categories = defaultCategories,
}: {
  categories?: Array<{ name: string; slug: string; hasSub?: boolean }>
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Khóa scroll body khi menu mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value as 'light' | 'dark'
    setTheme(selectedTheme)

    if (selectedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200 sticky top-0 z-50">
      {/* BAR CỐ ĐỊNH PHÍA TRÊN */}
      <div className="px-4 py-3 flex items-center justify-between">
        {/* LOGO & TITLE */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs">
            BH
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-black text-sm text-[#D81B50] dark:text-red-500 uppercase tracking-tight leading-none">
              MEDIA RUJUKAN MASSA
            </span>
            <span className="text-[10px] text-gray-600 dark:text-gray-400 font-medium leading-tight mt-0.5">
              Portal berita dan akhbar BM No. 1 di Malaysia
            </span>
          </div>
        </Link>

        {/* ICONS BÊN PHẢI (USER + HAMBURGER MENU) */}
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="text-gray-700 dark:text-gray-200 hover:text-red-600 transition-colors"
            aria-label="User Account"
          >
            <User className="w-5 h-5" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-200 hover:text-red-600 transition-colors p-1"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE SLIDE-DOWN OVERLAY */}
      {isOpen && (
        <div className="fixed right-0 top-[57px] bottom-0 z-50 flex w-3/4 max-w-[400px] flex-col overflow-y-auto bg-gray-50 shadow-2xl transition-all dark:bg-gray-950">
          <div className="w-full min-w-0 p-4 space-y-6">
            {/* HÀNG TOP MENU: SOCIAL ICONS & THEME SELECTOR */}
            <div className="flex flex-col items-end gap-3 pt-2">
              {/* SOCIAL ICONS */}
              <div className="flex max-w-full flex-wrap items-center justify-end gap-1.5 text-white">
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-gray-800 dark:bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-gray-800 dark:bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <XTwitterIcon />
                </a>
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-gray-800 dark:bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-gray-800 dark:bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <YoutubeIcon />
                </a>
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-gray-800 dark:bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="#"
                  className="w-7 h-7 rounded-full bg-gray-800 dark:bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <TikTokIcon />
                </a>
              </div>

              {/* SELECTOR THEME */}
              <div className="relative w-32">
                <select
                  value={theme}
                  onChange={handleThemeChange}
                  className="w-full appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <span className="text-[10px]">▼</span>
                </div>
              </div>
            </div>

            {/* DANH SÁCH CATEGORIES */}
            <nav className="divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800">
              {categories.map((cat) => (
                <div
                  key={cat.slug}
                  className="flex items-center justify-between py-3 px-1 text-gray-900 dark:text-gray-100 hover:text-red-600 transition-colors"
                >
                  {/* ICON DẤU + BÊN TRÁI (NẾU CÓ SUB-MENU) */}
                  <div>
                    {cat.hasSub !== false ? (
                      <button className="p-1 text-gray-700 dark:text-gray-300 hover:text-red-600">
                        <Plus className="w-5 h-5" />
                      </button>
                    ) : (
                      <div className="w-7" />
                    )}
                  </div>

                  {/* TÊN DANH MỤC CĂN PHẢI */}
                  <Link
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-base text-right flex-1"
                  >
                    {cat.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
