'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface MobileStickyAdProps {
  data?: {
    active?: boolean
    imageUrl?: string
    link?: string
    code?: string
  }
}

export default function MobileStickyAd({ data }: MobileStickyAdProps) {
  const [isClosed, setIsClosed] = useState(false)

  // Không hiển thị nếu tắt active, không có dữ liệu, hoặc người dùng đã bấm tắt
  if (!data?.active || isClosed) return null

  const { imageUrl, link, code } = data

  // Kiểm tra xem có dữ liệu quảng cáo để hiển thị không
  if (!code && !imageUrl) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex justify-center bg-black/80 p-1 md:hidden">
      {/* Nút đóng quảng cáo */}
      <button
        onClick={() => setIsClosed(true)}
        className="absolute -top-7 right-2 flex h-6 w-6 items-center justify-center rounded-t-md bg-black/80 text-xs font-bold text-white hover:bg-black"
        aria-label="Close Ads"
      >
        ✕
      </button>

      {/* Nội dung Quảng cáo */}
      <div className="w-full overflow-hidden text-center">
        {/* Trường hợp 1: Chèn mã Script/HTML trực tiếp */}
        {code ? (
          <div dangerouslySetInnerHTML={{ __html: code }} className="flex justify-center" />
        ) : (
          /* Trường hợp 2: Hiển thị ảnh Banner + Link */
          link &&
          imageUrl && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full">
              <img
                src={imageUrl}
                alt="Mobile Sticky Banner"
                className="block h-auto w-full object-contain"
              />
            </a>
          )
        )}
      </div>
    </div>
  )
}
