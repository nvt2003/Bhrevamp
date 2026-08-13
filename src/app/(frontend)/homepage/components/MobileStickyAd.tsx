'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'

export default function MobileStickyAd({ data }: { data: any }) {
  const [closed, setClosed] = useState(false)

  if (!data?.active || closed) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-black/80 flex flex-col items-center p-1 md:hidden">
      <button
        onClick={() => setClosed(true)}
        className="self-end text-white text-xs bg-gray-700 px-1.5 py-0.5 rounded mb-0.5"
      >
        <X className="w-3 h-3 inline" /> Close
      </button>

      {data.code ? (
        <div dangerouslySetInnerHTML={{ __html: data.code }} />
      ) : (
        <a href={data.link} target="_blank" rel="noreferrer">
          <img src={data.imageUrl} alt="Sticky Ad" className="max-h-[60px] w-auto object-contain" />
        </a>
      )}
    </div>
  )
}
