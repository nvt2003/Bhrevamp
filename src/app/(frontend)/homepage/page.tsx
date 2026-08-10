import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import NewsSlider from '../components/NewsSlider'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // 1. Lấy bài viết nổi bật chính (Featured Main)
  const featuredPosts = await payload.find({
    collection: 'posts',
    where: {
      isFeatured: { equals: true },
    },
    limit: 1,
  })
  const mainFeatured = featuredPosts.docs[0]

  // 2. Lấy danh sách tin mới nhất (bỏ qua bài nổi bật chính nếu cần)
  const latestPosts = await payload.find({
    collection: 'posts',
    sort: '-publishedAt', // Sắp xếp mới nhất lên đầu
    limit: 6,
  })

  // 3. Lấy danh sách chuyên mục
  const categories = await payload.find({
    collection: 'categories',
  })

  return (
    <div className="min-h-screen">
      {/* Slide bài viết trượt ngang */}
      <NewsSlider />

      {/* Các phần nội dung khác của trang chủ */}
      <div className="max-w-7xl mx-auto px-4 py-6">{/* Nội dung bài viết... */}</div>
    </div>
  )
}
