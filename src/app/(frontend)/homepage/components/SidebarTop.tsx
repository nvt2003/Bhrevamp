'use client'
import React from 'react'
import { formatRelativeTime } from '@/utilities/formatTime'

export default function SidebarTop({ terkini, trending }: { terkini: any[]; trending: any[] }) {
  return (
    <aside className="w-full space-y-8 font-sans">
      {/* 1. TERKINI (NẰM TRÊN - CÓ ẢNH VÀ SỐ ĐÈ LÊN ẢNH) */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Terkini</h2>
          <div className="w-10 h-1 bg-[#D81B50] mt-1"></div>
        </div>

        <div className="divide-y divide-gray-200">
          {terkini?.map((item, index) => (
            <div key={item.id} className="py-3 flex gap-3 group cursor-pointer items-start">
              {/* Tiêu đề & thời gian */}
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="text-sm font-semibold text-gray-900  dark:text-white group-hover:text-[#D81B50] leading-snug line-clamp-3">
                  {item.title}
                </h3>
                <span className="text-xs text-gray-400 mt-2 block">
                  {formatRelativeTime(item.publishedAt)}
                </span>
              </div>

              {/* Thumbnail + Số đè góc trái ảnh */}
              <div className="relative w-[110px] h-[70px] shrink-0 overflow-hidden rounded">
                <img
                  src={item.featuredImage?.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-0 left-1 text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none select-none">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. TRENDING (NẰM DƯỚI - SỐ NẰM TRÊN BÊN TRÁI TIÊU ĐỀ) */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending</h2>
          <div className="w-10 h-1 bg-[#D81B50] mt-1"></div>
        </div>

        <div className="divide-y divide-gray-200">
          {trending?.map((item, index) => (
            <div key={item.id} className="py-3 flex items-start gap-4 group cursor-pointer">
              {/* Số thứ tự Trending lớn */}
              <span className="text-3xl font-black text-black  dark:text-white group-hover:text-[#D81B50] leading-none shrink-0 w-6 pt-0.5">
                {index + 1}
              </span>

              {/* Tiêu đề & thời gian */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-  dark:text-white [#D81B50] leading-snug line-clamp-3">
                  {item.title}
                </h3>
                <span className="text-xs text-gray-400 mt-2 block">
                  {formatRelativeTime(item.publishedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
