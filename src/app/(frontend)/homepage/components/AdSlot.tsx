import React from 'react'

interface AdData {
  active?: boolean
  imageUrl?: string
  link?: string
  code?: string
  sizePreset?: string
  customClass?: string
}

interface AdSlotProps {
  pcAd?: AdData
  mobileAd?: AdData
  className?: string
}

export default function AdSlot({ pcAd, mobileAd, className = '' }: AdSlotProps) {
  // Hàm lấy chuỗi Tailwind class kích thước
  const getAdSizeClass = (ad?: AdData) => {
    if (!ad) return ''
    if (ad.sizePreset === 'custom') return ad.customClass || ''
    return ad.sizePreset || ''
  }

  const renderAdContent = (adData?: AdData) => {
    if (!adData || !adData.active) return null

    const sizeClass = getAdSizeClass(adData)

    return (
      <div
        className={`mx-auto w-full flex items-center justify-center overflow-hidden ${sizeClass}`}
      >
        {/* Trường hợp 1: Nhập mã Script / HTML */}
        {adData.code ? (
          <div
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: adData.code }}
          />
        ) : adData.imageUrl ? (
          /* Trường hợp 2: Upload Banner ảnh */
          <a
            href={adData.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img src={adData.imageUrl} alt="Advertisement" className="w-full h-full object-cover" />
          </a>
        ) : null}
      </div>
    )
  }

  return (
    <div className={`ad-slot-wrapper ${className}`}>
      {/* 1. KHUNG BÀI PC (md: 768px trở lên) */}
      {pcAd?.active && (
        <div className="hidden md:flex justify-center items-center w-full">
          {renderAdContent(pcAd)}
        </div>
      )}

      {/* 2. KHUNG BÀI MOBILE (dưới 768px) */}
      {mobileAd?.active && (
        <div className="flex md:hidden justify-center items-center w-full">
          {renderAdContent(mobileAd)}
        </div>
      )}
    </div>
  )
}
