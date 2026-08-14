import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import NewsSlider from '../components/NewsSlider'
import { seedPosts, seedFooter, seedHeader } from '@/endpoints/seed'
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
import VideoTerkiniSection from './components/VideoTerkiniSection'
import SihatSection from './components/SihatSection'
import AdSlot from '../components/AdSlot'
import MobileStickyAd from './components/MobileStickyAd'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const headerData = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })
  const isHeaderEmpty = headerData?.sliders
  if (!isHeaderEmpty)
    try {
      await seedHeader(payload)
    } catch (error) {
      console.log('Lỗi khi seed dữ liệu header', error)
    }
  const sliderData = headerData?.sliders

  //Kiểm tra xem Footer đã có dữ liệu chưa
  const footerData = await payload.findGlobal({
    slug: 'footer',
  })
  // Nếu chưa có cột links nào thì mới seed
  const isFooterEmpty = !footerData?.columns || footerData.columns.length === 0

  if (isFooterEmpty) {
    payload.logger.info('Trang chủ được truy cập lần đầu. Đang tự động seed dữ liệu...')

    try {
      await seedFooter(payload)
      await seedPosts(payload)

      payload.logger.info('Seed dữ liệu tự động hoàn tất!')
    } catch (error) {
      payload.logger.error('Lỗi khi tự động seed')
    }
  }

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
  const TrendingInTopData = homeData?.trending_in_top
  const disyorkanData = homeData?.disyorkanSection
  const rencanaData = homeData?.rencanaSection
  const sukanData = homeData?.sukanSection
  const duniaData = homeData?.duniaSection
  const bisnesData = homeData?.bisnesSection
  const hiburanData = homeData?.hiburanSection
  const gayaHidubData = homeData?.gayaHidupSection
  const sihatData = homeData?.sihatSection
  const bhPlusData = homeData?.bhPlusSection
  const infografikdata = homeData?.infografikSection
  const galeriFotoData = homeData?.galeriFotoSection
  const podcatData = homeData?.podcastSection
  const bhTvData = homeData?.bhTvSection
  const videoTerkiniData = homeData?.videoTerkiniSection

  const adsData = await payload.findGlobal({ slug: 'ads-config' as any })
  return (
    <div className="min-h-screen">
      {/* Slide bài viết trượt ngang */}
      <NewsSlider sliders={headerData?.sliders ?? []} />
      <TrendingBar data={TrendingInTopData} />
      <FloatingWidget />
      <MobileStickyAd data={adsData?.BH_HP_Sticky_Leaderboard} />
      {/* Các phần nội dung khác của trang chủ */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="w-full flex justify-center">
          <AdSlot
            pcAd={adsData?.BH_Web_Billboard_Homepage_970x250}
            mobileAd={adsData?.BH_320x50}
            className="my-6"
          />
        </div>
        {/* Utama */}
        <div className="mt-6 flex w-full flex-col gap-4 md:flex-row">
          <div className="flex-[2] min-w-0">
            <UtamaSection data={utamaData} adsData={adsData?.BH_Mobile_Banner} />
          </div>
          <div className="flex-[1] min-w-0">
            <AdSlot pcAd={adsData?.BH_300x250} className="my-6" />
            <SidebarTop terkini={terkiniResponse.docs} trending={trendingResponse.docs} />
          </div>
        </div>
        {/* Disyorkan */}
        <div className="flex mt-8">
          <DisyorkanSection data={disyorkanData} />
        </div>
        {/* Video Terkini */}
        <div className="flex mt-8">
          <VideoTerkiniSection data={videoTerkiniData} />
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
        <div className="flex flex-col md:flex-row mt-8 gap-2">
          <div className="flex-[2] min-w-0 space-y-4">
            {/* Bisnes */}
            <div>
              <BisnesSection data={bisnesData} />
            </div>
            {/* Hiburan */}
            <div>
              <HiburanSection data={hiburanData} />
            </div>
          </div>
          <div className="flex-[1] min-w-0 space-y-4">
            <div className="flex items-center justify-center">
              <AdSlot
                pcAd={adsData?.BH_300x250_b}
                mobileAd={adsData?.BH_Mobile_Banner_b}
                className="my-6"
              />
            </div>
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
            <div className="flex gap-2">
              {/* Gaya Hidup */}
              <div>
                <GayaHidupSection data={gayaHidubData} />
              </div>
              {/* Shihat */}
              <div>
                <SihatSection data={sihatData} />
              </div>
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
