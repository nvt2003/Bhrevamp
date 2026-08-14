'use client'

import React, { useState, useEffect } from 'react'

interface TerikiPopupAdProps {
  data?: {
    active?: boolean
    imageUrl?: string
    link?: string
    code?: string
  }
  targetRef: React.RefObject<HTMLElement | null>
}

export default function TerikiPopupAd({ data, targetRef }: TerikiPopupAdProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    // Nếu không active hoặc người dùng đã bấm tắt thì không cần lắng nghe
    if (!data?.active || isClosed) return

    const element = targetRef.current
    if (!element) return

    // Sử dụng IntersectionObserver để phát hiện khi lướt tới mục Teriki
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          console.log('Đã lướt tới mục Teriki!')
          setIsVisible(true)
          // ngắt observer sau khi đã kích hoạt 1 lần (nếu chỉ muốn nảy ra 1 lần)
          observer.disconnect()
        }
      },
      {
        threshold: 0.2, // Hiện ra khi lướt tới 20% nội dung của phần Teriki
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [targetRef, data?.active, isClosed])

  // Điều kiện dừng render
  if (!data?.active || isClosed || !isVisible) return null

  const { imageUrl, link, code } = data
  if (!code && !imageUrl) return null

  return (
    <>
      {/* Overlay lớp nền mờ nhẹ (tùy chọn: giúp quảng cáo nổi bật hơn) */}
      <div
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px] md:hidden transition-opacity duration-300"
        onClick={() => setIsClosed(true)}
      />

      {/* Box Quảng Cáo Popup với Hiệu ứng Scale/Bounce */}
      <div className="fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[340px] rounded-lg bg-white p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-300 md:hidden">
        {/* Nút Đóng */}
        <button
          onClick={() => setIsClosed(true)}
          className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white font-bold text-sm shadow-md hover:bg-gray-800"
          aria-label="Close Ad"
        >
          ✕
        </button>

        {/* Nội dung quảng cáo */}
        <div className="w-full overflow-hidden rounded">
          {code ? (
            <div dangerouslySetInnerHTML={{ __html: code }} className="flex justify-center" />
          ) : (
            link &&
            imageUrl && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="block w-full">
                <img
                  src={imageUrl}
                  alt="Teriki Mobile Banner"
                  className="w-full h-auto object-cover max-h-[300px] rounded"
                />
              </a>
            )
          )}
        </div>
      </div>
    </>
  )
}
