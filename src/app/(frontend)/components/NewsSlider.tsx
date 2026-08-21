'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import type { Media } from '@/payload-types'

import 'swiper/css'
import 'swiper/css/navigation'
import { getPostUrl } from '@/lib/routing/getPostUrl'

export default function NewsSlider({ sliders = [] }: { sliders?: any[] }) {
  // kiểm tra tạo slide chưa
  if (!sliders || sliders.length === 0) {
    return null // Hoặc render khung trống tạm thời
  }
  const swiperRef = useRef<SwiperType | null>(null)
  return (
    <section className="w-full bg-gray-100 dark:bg-[#444] py-3 my-2">
      <div className="max-w-7xl mx-auto px-4 relative flex items-center">
        {/* NÚT MŨI TÊN TRÁI */}
        <div className="absolute left-0 top-0 z-10 flex h-full w-24 p-4 items-center justify-start bg-gradient-to-r from-gray-200 dark:from-[#444] to-transparent">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="z-10 shrink-0 mr-2 w-5 h-5 md:w-9 md:h-9 rounded-md border-2 border-[#D31145] bg-white dark:bg-gray-900 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-full text-[#D31145] h-full p-[1px] stroke-[2.5]" />
          </button>
        </div>

        {/* SWIPER CAROUSEL */}
        <div className="relative w-full overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            spaceBetween={16}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="w-full"
          >
            {sliders.map((item: any, index: number) => {
              if (!item) return null

              // Lấy URL ảnh linh hoạt (hỗ trợ cả Object Media từ Payload hoặc string URL truyền trực tiếp)
              const imageUrl = item.featuredImage?.url || ''

              // Lấy alt text
              const imageAlt = item.featuredImage?.alt || item.title || 'Slider image'

              // Format slug/link
              const href = getPostUrl(item)

              return (
                <SwiperSlide key={item.id || index}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 bg-transparent p-2 hover:shadow-md transition-all h-20 border-r border-gray-200 dark:border-white-800"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-20 h-16 shrink-0 rounded-md overflow-hidden bg-slate-100 dark:bg-gray-700">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          sizes="80px"
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>

                    {/* Nội dung */}
                    <div className="flex flex-col justify-center overflow-hidden pr-1">
                      <span className="text-[11px] font-bold text-[#D81B50] uppercase tracking-wider">
                        {/* {item.category} */}
                        {item.category && (
                          <span className="badge-category">{item.category.name}</span>
                        )}
                      </span>
                      <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* NÚT MŨI TÊN PHẢI */}

        <div className="absolute right-0 top-0 z-10 flex h-full w-24 p-4 items-center justify-end bg-gradient-to-l from-gray-200 dark:from-[#444] to-transparent">
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="z-10 shrink-0 ml-2 w-5 h-5 md:w-9 md:h-9 rounded-md border-2 border-[#D31145] bg-white dark:bg-gray-900 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-full h-full p-[1px] stroke-[2.5] text-[#D31145]" />
          </button>
        </div>
      </div>
    </section>
  )
}
