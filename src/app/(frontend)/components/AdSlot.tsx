import React from 'react'

interface AdData {
  active?: boolean | null
  imageUrl?: string | null
  link?: string | null
  code?: string | null
  sizePreset?: string | null
  customWidth?: number | null
  customHeight?: number | null
}
interface AdSlotProps {
  pcAd?: AdData
  mobileAd?: AdData
  className?: string
  defaultFallbackSize?: string
}

export default function AdSlot({
  pcAd,
  mobileAd,
  className = '',
  defaultFallbackSize = 'max-w-[300px] aspect-[300/225]',
}: AdSlotProps) {
  const resolveAdStyle = (ad?: AdData) => {
    if (!ad) return { className: defaultFallbackSize, style: {}, label: '300x225' }

    // Trường hợp 1: Chọn Tự nhập số Width / Height
    if (ad.sizePreset === 'custom') {
      const w = ad.customWidth || 300
      const h = ad.customHeight || 225

      return {
        className: '', // Tự bọc style inline nên không cần class
        style: {
          maxWidth: `${w}px`,
          aspectRatio: `${w} / ${h}`,
        },
        label: `${w}x${h}`,
      }
    }

    // Trường hợp 2: Chọn Preset có sẵn
    const presetClass = ad.sizePreset || defaultFallbackSize
    const match = presetClass.match(/aspect-\[(\d+)\/(\d+)\]/)
    const label = match ? `${match[1]}x${match[2]}` : 'AD'

    return {
      className: presetClass,
      style: {},
      label,
    }
  }

  const renderAdContent = (adData?: AdData) => {
    const { className: sizeClass, style: sizeStyle, label } = resolveAdStyle(adData)
    const hasContent = adData?.active && (adData?.code || adData?.imageUrl)

    // 1. TRƯỜNG HỢP CÓ QUẢNG CÁO
    if (hasContent) {
      return (
        <div
          className={`mx-auto w-full flex items-center justify-center overflow-hidden ${sizeClass}`}
          style={sizeStyle}
        >
          {adData.code ? (
            <div
              className="w-full h-full flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: adData.code }}
            />
          ) : (
            <a
              href={adData.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              {adData.imageUrl && (
                <img
                  src={adData.imageUrl}
                  alt="Advertisement"
                  className="w-full h-full object-cover"
                />
              )}
            </a>
          )}
        </div>
      )
    }

    // 2. TRƯỜNG HỢP KHÔNG CÓ QUẢNG CÁO -> HIỆN PLACEHOLDER
    return (
      <div
        className={`mx-auto w-full bg-blue-200 text-black font-semibold text-sm flex items-center justify-center rounded border border-blue-300 ${sizeClass}`}
        style={sizeStyle}
      >
        Ad {label}
      </div>
    )
  }

  return (
    <div className={`w-full ad-slot-wrapper ${className}`}>
      {/* PC */}
      <div className="hidden md:flex justify-center items-center w-full">
        {renderAdContent(pcAd)}
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden justify-center items-center w-full">
        {renderAdContent(mobileAd)}
      </div>
    </div>
  )
}
