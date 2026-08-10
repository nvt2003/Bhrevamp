'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Search } from 'lucide-react'

// Danh sách các danh mục mặc định (hoặc truyền qua props từ PayloadCMS Categories)
const defaultCategories = [
  { name: 'Berita', slug: 'berita' },
  { name: 'Sukan', slug: 'sukan' },
  { name: 'Hiburan', slug: 'hiburan' },
  { name: 'Dunia', slug: 'dunia' },
  { name: 'Bisnes', slug: 'bisnes' },
  { name: 'Rencana', slug: 'rencana' },
  { name: 'Gaya Hidup', slug: 'gaya-hidup' },
  { name: '#Marilokal', slug: 'marilokal' },
  { name: '1Klassifieds', slug: '1klassifieds' },
]

export default function Navbar({
  categories = defaultCategories,
}: {
  categories?: Array<{ name: string; slug: string }>
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  // Xử lý khi nhấn Submit khung Tìm Kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 py-2.5 overflow-x-auto">
        {/* BÊN TRÁI: DANH SÁCH MỤC NAVBAR (CHUYỂN TRANG) */}
        <div className="flex items-center gap-6 whitespace-nowrap overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const href = `/category/${cat.slug}`
            const isActive = pathname === href

            return (
              <Link
                key={cat.slug}
                href={href}
                className={`text-sm font-bold transition-colors hover:text-red-600 ${
                  isActive
                    ? 'text-red-600 border-b-2 border-red-600 pb-1'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {cat.name}
              </Link>
            )
          })}
        </div>

        {/* BÊN PHẢI: KHUNG TÌM KIẾM */}
        <form onSubmit={handleSearch} className="relative flex items-center shrink-0">
          <input
            type="text"
            placeholder="Cari kata kunci"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48 md:w-60 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs rounded-md pl-3 pr-8 py-1.5 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-red-600"
          />
          <button
            type="submit"
            className="absolute right-2 text-gray-500 dark:text-gray-400 hover:text-red-600 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>
    </nav>
  )
}
