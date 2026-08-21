'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'

export default function FloatingWidget({ data }: { data: any }) {
  // Trạng thái ẩn/hiện cho từng widget
  const [showVideo, setShowVideo] = useState(true)
  const [showBanner, setShowBanner] = useState(true)

  // Nếu tắt cả 2 thì không render nữa
  if (!showVideo && !showBanner) return null
  // Hàm helper tự động bóc tách ID từ mọi định dạng link YouTube thông dụng
  const getEmbedUrl = (url: string) => {
    if (!url) return ''

    // Xử lý link dạng: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID, youtube.com/shorts/ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    // ID của YouTube luôn có độ dài chuẩn là 11 ký tự
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&enablejsapi=1`
    }

    // Nếu là link MP4 trực tiếp hoặc link khác thì giữ nguyên
    return url
  }
  const videoSrc = data?.videoType === 'file' ? data?.mediaFile?.url : getEmbedUrl(data?.videoUrl)

  const thumbnailUrl = data?.thumbnail?.url
  return (
    // <div className="fixed top-50 right-6 z-50 flex flex-col items-end gap-5 max-w-[280px] sm:max-w-[320px]">
    <div className="fixed top-50 right-10 z-50 flex w-[50vw] max-w-full flex-col items-end gap-5 overflow-visible sm:right-6">
      {/* ================= 1. POPUP VIDEO/THUMBNAIL (GÓC TRÊN) ================= */}
      {data?.enable && showVideo && (
        // <div className="relative group animate-fade-in">
        <div className="relative group w-full max-w-[280px] animate-fade-in">
          {/* Nút Đóng (X) màu xám viền trắng góc trên phải */}
          <button
            onClick={() => setShowVideo(false)}
            aria-label="Close video popup"
            className="absolute -top-5 -right-5 z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-600/90 text-white shadow-md transition-all hover:bg-gray-800"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>

          {/* Frame Video có viền Đỏ bo góc */}
          <div className="relative rounded border-6 border-red-600 overflow-hidden bg-black shadow-2xl">
            <div className="aspect-video w-full relative">
              {data?.video_url ? (
                <iframe
                  src={getEmbedUrl(data.video_url)}
                  title="Video Popup"
                  className="w-full h-full border-0 object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : data?.thumbnail?.url ? (
                <img
                  src={data.thumbnail.url}
                  alt={data.thumbnail.alt || 'Video thumbnail'}
                  className="w-full h-full object-cover"
                />
              ) : (
                // Trạng thái dự phòng cuối cùng nếu cả URL và Thumbnail đều không có
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400 text-xs">
                  Chưa có video
                </div>
              )}
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
