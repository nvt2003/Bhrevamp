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
    <div className="fixed top-50 right-0 z-50 flex w-[min(320px,100vw)] max-w-full flex-col items-end gap-5 overflow-visible sm:right-6">
      {/* ================= 1. POPUP VIDEO/THUMBNAIL (GÓC TRÊN) ================= */}
      {showVideo && (
        // <div className="relative group animate-fade-in">
        <div className="relative group w-full max-w-[280px] animate-fade-in">
          {/* Nút Đóng (X) màu xám viền trắng góc trên phải */}
          <button
            onClick={() => setShowVideo(false)}
            aria-label="Close video popup"
            className="absolute -top-0 -right-0 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-600/90 text-white shadow-md transition-all hover:bg-gray-800"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Frame Video có viền Đỏ bo góc */}
          <div className="relative rounded border-6 border-red-600 overflow-hidden bg-black shadow-2xl">
            <div className="aspect-video w-full relative">
              {/* Ảnh Thumbnail Video Mẫu */}
              <img
                src="https://picsum.photos/seed/courtroom/400/225"
                alt="Video preview"
                className="w-full h-full object-cover"
              />

              {/* Lớp Overlay giả lập thanh Player Control */}
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
        <div className="relative group max-w-full animate-fade-in">
          {/* Nút Đóng (X) góc trên phải */}
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Close banner"
            className="absolute -top-3 -right-2 z-10 w-7 h-7 items-center justify-center rounded-full border-2 border-white bg-gray-600/90 text-white shadow-md transition-all hover:bg-gray-800"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Nút Đỏ Capsule Bo Tròn */}
          <button
            // onClick={() => (alert('Mở Ringkasan Berita!'))}
            className="flex max-w-full items-center justify-between gap-3 rounded-full border-2 border-white bg-red-600 py-1.5 pl-5 pr-1.5 text-white shadow-xl transition-transform hover:bg-red-700 active:scale-95"
          >
            {/* Chữ Ringkasan Berita */}
            <div className="flex shrink-0 flex-col items-center text-left text-xs font-black uppercase leading-tight tracking-wide sm:text-sm">
              <span>RINGKASAN</span>
              <span>BERITA</span>
            </div>

            {/* Icon Tròn Tím/Hồng Sáng bên phải */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gradient-to-tr from-purple-700 via-pink-600 to-indigo-500 shadow-inner">
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
