'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'

// Import CSS chuẩn của Swiper
import 'swiper/css'
import 'swiper/css/navigation'

// Dữ liệu mẫu (sau này bạn truyền props từ PayloadCMS vào)
const samplePosts = [
  {
    id: '1',
    category: 'Hiburan',
    title: "Stacy 'terbang' di Sabah",
    slug: 'stacy-terbang-di-sabah',
    imageUrl: 'https://picsum.photos/seed/1/200/150',
  },
  {
    id: '2',
    category: 'Bisnes',
    title: 'Komputer riba serba pintar permudah sambungan iPhone, Windows',
    slug: 'komputer-riba-serba-pintar',
    imageUrl: 'https://picsum.photos/seed/2/200/150',
  },
  {
    id: '3',
    category: 'Sukan',
    title: 'Khelif perlu pulangkan pingat - Kremlev',
    slug: 'khelif-perlu-pulangkan-pingat',
    imageUrl: 'https://picsum.photos/seed/3/200/150',
  },
  {
    id: '4',
    category: 'Nasional',
    title: 'Perang Israel-Iran tidak mengubah nasib Gaza',
    slug: 'perang-israel-iran',
    imageUrl: 'https://picsum.photos/seed/4/200/150',
  },
  {
    id: '5',
    category: 'Thế Giới',
    title: 'Cập nhật diễn biến kinh tế thế giới mới nhất hôm nay',
    slug: 'dien-bien-kinh-te',
    imageUrl: 'https://picsum.photos/seed/5/200/150',
  },
]

export default function NewsSlider({ posts = [] }: { posts?: any[] }) {
  // Nếu chưa tạo slide nào trong Admin, ẩn hoặc hiện thông báo nhẹ
  if (!posts || posts.length === 0) {
    return null // Hoặc render khung trống tạm thời
  }
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <section className="w-full bg-gray-100 dark:bg-gray-800/60 py-3 my-2 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 relative flex items-center">
        {/* NÚT MŨI TÊN TRÁI */}
        <button
          ref={prevRef}
          aria-label="Previous slide"
          className="z-10 shrink-0 mr-2 w-8 h-8 md:w-9 md:h-9 rounded-md border-2 border-red-500/80 bg-white dark:bg-gray-900 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* SWIPER CAROUSEL */}
        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            onInit={(swiper) => {
              // Gắn ref nút bấm tùy chỉnh cho Swiper
              if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
                swiper.navigation.init()
                swiper.navigation.update()
              }
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="w-full"
          >
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex items-center gap-3 bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-200/80 dark:border-gray-700/60 shadow-sm hover:shadow-md transition-all h-20"
                >
                  {/* Ảnh Thumbnail */}
                  <div className="w-20 h-16 shrink-0 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Nội dung tin */}
                  <div className="flex flex-col justify-center overflow-hidden pr-1">
                    <span className="text-[11px] font-bold text-[#D81B50] uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors mt-0.5">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* NÚT MŨI TÊN PHẢI */}
        <button
          ref={nextRef}
          aria-label="Next slide"
          className="z-10 shrink-0 ml-2 w-8 h-8 md:w-9 md:h-9 rounded-md border-2 border-red-500/80 bg-white dark:bg-gray-900 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </section>
  )
}
