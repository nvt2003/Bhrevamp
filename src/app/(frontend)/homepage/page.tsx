import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import NewsSlider from '../components/NewsSlider'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  // Truy vấn lấy các item trong collection Sliders, sắp xếp theo thứ tự (order)
  const sliderRes = await payload.find({
    collection: 'sliders',
    sort: 'order', // Sắp xếp theo trường order tăng dần
    depth: 1, // Để lấy thông tin chi tiết của ảnh Upload
  })

  // Format lại dữ liệu cho gọn gàng
  const slides = sliderRes.docs.map((doc: any) => ({
    id: doc.id,
    title: doc.title,
    category: doc.category,
    slug: doc.slug,
    // Lấy URL ảnh từ quan hệ media
    imageUrl: typeof doc.image === 'object' && doc.image?.url ? doc.image.url : '/placeholder.jpg',
  }))

  return (
    <div className="min-h-screen">
      {/* Slide bài viết trượt ngang */}
      <NewsSlider />

      {/* Các phần nội dung khác của trang chủ */}
      <div className="max-w-7xl mx-auto px-4 py-6">{/* Nội dung bài viết... */}</div>
    </div>
  )
}
