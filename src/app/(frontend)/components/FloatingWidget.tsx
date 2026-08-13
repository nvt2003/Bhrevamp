'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'

export default function FloatingWidget() {
  // Trạng thái ẩn/hiện cho từng widget
  const [showVideo, setShowVideo] = useState(true)
  const [showBanner, setShowBanner] = useState(true)

  // Nếu tắt cả 2 thì không render nữa
  if (!showVideo && !showBanner) return null

  return (
    // <div className="fixed top-50 right-6 z-50 flex flex-col items-end gap-5 max-w-[280px] sm:max-w-[320px]">
    <div className="fixed top-50 right-0 z-50 flex w-auto max-w-[calc(100vw-1rem)] flex-col items-end gap-5 overflow-visible sm:right-6">
      {/* ================= 1. POPUP VIDEO/THUMBNAIL (GÓC TRÊN) ================= */}
      {showVideo && (
        // <div className="relative group animate-fade-in">
        <div className="relative group w-[min(280px,calc(100vw-1rem))] max-w-full animate-fade-in">
          {/* Nút Đóng (X) màu xám viền trắng góc trên phải */}
          <button
            onClick={() => setShowVideo(false)}
            aria-label="Close video popup"
            className="absolute -top-0 -right-0 z-10 w-7 h-7 bg-gray-600/90 hover:bg-gray-800 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all scale-95 group-hover:scale-105"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Frame Video có viền Đỏ bo góc */}
          <div className="relative rounded border-4 border-red-600 overflow-hidden bg-black shadow-2xl">
            <div className="aspect-video w-full relative">
              {/* Ảnh Thumbnail Video Mẫu */}
              <img
                src="https://picsum.photos/seed/courtroom/400/225"
                alt="Video preview"
                className="w-full h-full object-cover"
              />

              {/* Lớp Overlay giả lập thanh Player Control nếu cần */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2">
                <span className="text-[10px] text-white font-semibold bg-red-600/90 px-1.5 py-0.5 rounded">
                  TRỰC TIẾP
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. BANNER RINGKASAN BERITA (GÓC DƯỚI) ================= */}
      {showBanner && (
        // <div className="relative group animate-fade-in">
        <div className="relative group max-w-[calc(100vw-1rem)] animate-fade-in">
          {/* Nút Đóng (X) góc trên phải */}
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Close banner"
            className="absolute -top-3 -right-2 z-10 w-7 h-7 bg-gray-600/90 hover:bg-gray-800 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md transition-all scale-95 group-hover:scale-105"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Nút Đỏ Capsule Bo Tròn */}
          <button
            onClick={() => alert('Mở Ringkasan Berita!')}
            className="flex items-center justify-between gap-3 bg-red-600 hover:bg-red-700 text-white pl-5 pr-1.5 py-1.5 rounded-full border-2 border-white shadow-xl transition-transform active:scale-95 group"
          >
            {/* Chữ Ringkasan Berita */}
            <div className="flex flex-col text-left leading-tight font-black uppercase text-xs sm:text-sm tracking-wide items-center">
              <span>RINGKASAN</span>
              <span>BERITA</span>
            </div>

            {/* Icon Tròn Tím/Hồng Sáng bên phải */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-700 via-pink-600 to-indigo-500 border-2 border-white flex items-center justify-center shadow-inner shrink-0">
              {/* Icon đồng hồ / tóm tắt tin tức */}
              <svg
                className="w-5 h-5 text-white animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
