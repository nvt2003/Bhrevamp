'use client'

import React from 'react'
import Link from 'next/link'

export default function TrendingBar({ data }: { data: any }) {
  return (
    <section className="w-full bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 py-2.5">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 overflow-x-auto no-scrollbar">
        {/* NHÃN TRENDING : (CHỮ ĐỎ BỎNG) */}
        <div className="flex items-center gap-1 shrink-0 font-serif">
          <span className="text-red-600 font-bold text-base tracking-wide">Trending :</span>
        </div>

        {/* DANH SÁCH KEYWORDS NẰM NGANG */}
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap no-scrollbar">
          {data.map((item: any) => (
            <Link
              key={item.id}
              href={`/search?q=${encodeURIComponent(item.keyword)}`}
              className="text-sm text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500 font-medium transition-colors"
            >
              {item.keyword}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
