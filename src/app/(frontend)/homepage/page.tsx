import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import NewsSlider from '../components/NewsSlider'
import { seedPosts } from '@/endpoints/seed'
import TrendingBar from '../components/TrendingBar'
import FloatingWidget from '../components/FloatingWidget'
import UtamaSection from './components/UtamaSection'
import SidebarTop from './components/SidebarTop'
import DisyorkanSection from './components/DisyorkanSection'
import RencanaSection from './components/RencanaSection'
import SukanSection from './components/SukanSection'
import DuniaSection from './components/DuniaSection'
import BisnesSection from './components/BisnesSection'
import HiburanSection from './components/HiburanSection'
import GayaHidupSection from './components/GayaHidupSection'
import BhPlusSection from './components/BhPlusSection'
import InfografikSection from './components/InfografikSection'
import GaleriFotoSection from './components/GaleriFotoSection'
import PodcastSection from './components/PodcastSection'
import BhTvSection from './components/BhTvSection'

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
  // Fetch dữ liệu Global Trang Chủ
  const homeData = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
  })
  const utamaSection = homeData?.utamaSection
  const utamaData = {
    title: utamaSection?.title || 'Utama',
    featuredMain: utamaSection?.featuredMain,
    featuredSide: (utamaSection?.featuredSide as any[]) || [],
    featuredBullet: (utamaSection?.featuredBullet as any[]) || [],
    gridPosts: (utamaSection?.gridPosts as any[]) || [],
  }
  // Fetch Terkini
  const terkiniResponse = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: utamaSection?.terkiniLimit || 5,
  })

  // Fetch Trending
  const trendingResponse = await payload.find({
    collection: 'posts',
    where: {
      status: { equals: 'published' },
      isTrending: { equals: true },
    },
    sort: '-publishedAt',
    limit: utamaSection?.trendingLimit || 5,
  })
  const disyorkanData = homeData?.disyorkanSection
  const rencanaData = homeData?.rencanaSection
  const sukanData = homeData?.sukanSection
  const duniaData = homeData?.duniaSection
  const bisnesData = homeData?.bisnesSection
  const hiburanData = homeData?.hiburanSection
  const gayaHidubData = homeData?.gayaHidupSection
  const bhPlusData = homeData?.bhPlusSection
  const infografikdata = homeData?.infografikSection
  const galeriFotoData = homeData?.galeriFotoSection
  const podcatData = homeData?.podcastSection
  const bhTvData = homeData?.bhTvSection
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
            <UtamaSection data={utamaData} />
          </div>
          <div className="flex-[1] min-w-0">
            <SidebarTop terkini={terkiniResponse.docs} trending={trendingResponse.docs} />
          </div>
        </div>
        {/* Disyorkan */}
        <div className="flex mt-8">
          <DisyorkanSection data={disyorkanData} />
        </div>
        {/* Rencana */}
        <div className="flex mt-8">
          <RencanaSection data={rencanaData} />
        </div>
        {/* BH TV */}
        <div className="flex mt-8">
          <BhTvSection data={bhTvData} />
        </div>
        {/* Sukan */}
        <div className="flex mt-8">
          <SukanSection data={sukanData} />
        </div>
        <div className="flex mt-8 gap-2">
          <div className="flex-[2] min-w-0">
            {/* Bisnes */}
            <div>
              <BisnesSection data={bisnesData} />
            </div>
            {/* Hiburan */}
            <div>
              <HiburanSection data={hiburanData} />
            </div>
          </div>
          <div className="flex-[1] min-w-0">
            <div className="bg-blue-100">Ad</div>
            {/* Postcast */}
            <div>
              <PodcastSection data={podcatData} />
            </div>
          </div>
        </div>
        {/* Dunia */}
        <div className="flex mt-8">
          <DuniaSection data={duniaData} />
        </div>
        <div className="flex gap-2 mt-8">
          <div className="flex-[2] min-w-0">
            {/* Gaya Hidup */}
            <div>
              <GayaHidupSection data={gayaHidubData} />
            </div>
            {/* Bh Plus */}
            <div>
              <BhPlusSection data={bhPlusData} />
            </div>
          </div>
          <div className="flex-[1] min-w-0">
            {/* Infografik */}
            <div>
              <InfografikSection data={infografikdata} />
            </div>
            {/* Galeri Foto */}
            <div>
              <GaleriFotoSection data={galeriFotoData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
