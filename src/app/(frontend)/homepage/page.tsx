import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import NewsSlider from '../components/NewsSlider'
import { seedPosts } from '@/endpoints/seed'
import TrendingBar from '../components/TrendingBar'
import FloatingWidget from '../components/FloatingWidget'
import UtamaSection from './UtamaSection'

export const sampleTrending = [
  { id: '1', keyword: 'Accounts', slug: 'accounts' },
  { id: '2', keyword: '1MDB scandal', slug: '1mdb-scandal' },
  { id: '3', keyword: 'Election 2024', slug: 'election-2024' },
  { id: '4', keyword: 'Floods', slug: 'floods' },
  { id: '5', keyword: 'New year 2025', slug: 'new-year-2025' },
]
export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  // Truy vấn lấy các item trong collection Sliders, sắp xếp theo thứ tự (order)
  const sliderRes = await payload.find({
    collection: 'sliders',
    sort: 'order', // Sắp xếp theo trường order tăng dần
    depth: 1, // Để lấy thông tin chi tiết của ảnh Upload
  })
  // Format lại dữ liệu cho gọn gàng để truyền xuống Client Component
  const slides = sliderRes.docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title,
    category: doc.category,
    slug: doc.slug,
    // Lấy URL ảnh từ quan hệ media
    imageUrl: typeof doc.image === 'object' && doc.image?.url ? doc.image.url : '/placeholder.jpg',
  }))

  const trendingRes = await payload.find({ collection: 'trending' })
  const formattedTrending = trendingRes.docs.map((doc: any) => ({
    id: String(doc.id),
    keyword: doc.keyword,
    slug: doc.slug || doc.keyword.toLowerCase().replace(/\s+/g, '-'),
  }))
  // Query song song 4 truy vấn riêng biệt theo từng position
  const [mainDocs, sideDocs, bulletDocs, gridDocs] = await Promise.all([
    // 1. Chỉ lấy 1 bài tin chính nổi bật nhất
    payload.find({
      collection: 'utama',
      where: { position: { equals: 'featured_main' } },
      limit: 1,
      depth: 2,
      sort: '-publishedAt', // Lấy bài mới nhất
    }),

    // 2. Chỉ lấy đúng 4 tin sidebar
    payload.find({
      collection: 'utama',
      where: { position: { equals: 'featured_side' } },
      limit: 4,
      depth: 2,
      sort: '-publishedAt',
    }),

    // 3. Chỉ lấy đúng 3 tin bullet
    payload.find({
      collection: 'utama',
      where: { position: { equals: 'featured_bullet' } },
      limit: 3,
      depth: 2,
      sort: '-publishedAt',
    }),

    // 4. Lấy 9 bài cho lưới tin bên dưới
    payload.find({
      collection: 'utama',
      where: { position: { equals: 'grid' } },
      limit: 9,
      depth: 2,
      sort: '-publishedAt',
    }),
  ])

  // Format dữ liệu gọn gàng
  const formattedUtama = {
    featuredMain: mainDocs.docs[0] || null,
    featuredSide: sideDocs.docs,
    featuredBullet: bulletDocs.docs,
    gridPosts: gridDocs.docs,
  }

  return (
    <div className="min-h-screen">
      {/* Slide bài viết trượt ngang */}
      <NewsSlider posts={slides} />
      <TrendingBar trendingList={formattedTrending} />
      <FloatingWidget />
      {/* Các phần nội dung khác của trang chủ */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[970px] aspect-[970/90] bg-blue-200 text-black flex items-center justify-center">
            Ad 970x90
          </div>
        </div>
        {/* Utama */}
        <div className="w-full flex gap-4 mt-6">
          <div className="flex-[2] min-w-0">
            {/* <div className="flex gap-2 mb-2">
              <div className="flex-[1] min-w-0 bg-green-100">1</div>
              <div className="flex-[2] min-w-0 bg-green-100">2</div>
            </div> */}
            <UtamaSection formattedUtama={formattedUtama} />
            <div className="bg-green-100">3</div>
          </div>
          <div className="flex-[1] min-w-0 bg-blue-100">
            <div className="max-w-[300px] aspect-[300/250] bg-blue-200 text-black flex items-center justify-center m-4">
              Ad 300x250
            </div>
            <div className="bg-green-100 mt-2 text-xl font-semibold">Terkini</div>
            <div className="bg-green-100 mt-2 text-xl font-semibold">Trending</div>
          </div>
        </div>
        {/* Disyorkan */}
        <div className="flex mt-8">
          <div className="flex-[2] min-w-0 bg-blue-100">
            <div className="text-xl font-semibold">Disyorkan</div>
          </div>
          <div className="flex-[3] flex min-w-0 bg-blue-100 justify-end">
            <div>Lagi Disyorkan</div>
          </div>
        </div>
      </div>
    </div>
  )
}
