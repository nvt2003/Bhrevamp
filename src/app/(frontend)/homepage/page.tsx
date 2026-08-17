import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import NewsSlider from '../components/NewsSlider'
import { seedPosts, seedFooter, seedHeader } from '@/endpoints/seed'
import TrendingBar from '../components/TrendingBar'
import FloatingWidget from '../components/FloatingWidget'
import UtamaSection from './components/display/UtamaSection'
import SidebarTop from './components/display/SidebarTop'
import DisyorkanSection from './components/DisyorkanSection'
import RencanaSection from './components/display/RencanaSection'
import SukanSection from './components/display/SukanSection'
import DuniaSection from './components/DuniaSection'
import BisnesSection from './components/BisnesSection'
import HiburanSection from './components/HiburanSection'
import GayaHidupSection from './components/GayaHidupSection'
import BhPlusSection from './components/display/BhPlusSection'
import InfografikSection from './components/InfografikSection'
import GaleriFotoSection from './components/GaleriFotoSection'
import PodcastSection from './components/display/PodcastSection'
import BhTvSection from './components/display/BhTvSection'
import VideoTerkiniSection from './components/display/VideoTerkiniSection'
import SihatSection from './components/display/SihatSection'
import AdSlot from '../components/AdSlot'
import MobileStickyAd from './components/display/MobileStickyAd'
import { getHomeTrending, getHomeUtama } from './components/loading/getHomePageData'
import { Metadata } from 'next'
import HomeSecondarySections from './components/loading/HomeSecondarySections'
import HomeThirdSections from './components/loading/HomeThirdSections'
// Cấu hình revalidate 60s để không cần query Database ở mỗi request
export const revalidate = 60
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Homepage',
    description: 'News',
  }
}

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
  const adsData = await payload.findGlobal({
    slug: 'ads-config',
    depth: 2,
  })

  const [trending_in_top, utama] = await Promise.all([getHomeTrending(), getHomeUtama()])

  //Fetch Terkini & Trending SONG SONG dựa trên limit lấy từ homeData
  const [terkiniResponse, trendingResponse] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: utama?.terkiniLimit || 5,
    }),
    payload.find({
      collection: 'posts',
      where: {
        status: { equals: 'published' },
        isTrending: { equals: true },
      },
      sort: '-publishedAt',
      limit: utama?.trendingLimit || 5,
    }),
  ])
  return (
    <div className="min-h-screen">
      {/* Slide bài viết trượt ngang */}
      <NewsSlider sliders={headerData?.sliders ?? []} />
      {trending_in_top && <TrendingBar data={trending_in_top} />}
      {/* <TrendingBar data={TrendingInTopData} /> */}
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
            <UtamaSection data={utama} adsData={adsData?.BH_Mobile_Banner} />
          </div>
          <div className="flex-[1] min-w-0">
            <AdSlot pcAd={adsData?.BH_300x250} className="my-6" />
            <SidebarTop
              terkini={terkiniResponse.docs}
              trending={trendingResponse.docs}
              adData={adsData?.BH_Mobile_Banner_b}
            />
          </div>
        </div>
        <HomeSecondarySections />
        <HomeThirdSections adsData={adsData} />
      </div>
      {/* <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="w-full flex justify-center">
          <AdSlot
            pcAd={adsData?.BH_Web_Billboard_Homepage_970x250}
            mobileAd={adsData?.BH_320x50}
            className="my-6"
          />
        </div>
        Utama
        <div className="mt-6 flex w-full flex-col gap-4 md:flex-row">
          <div className="flex-[2] min-w-0">
            <UtamaSection data={utama} adsData={adsData?.BH_Mobile_Banner} />
          </div>
          <div className="flex-[1] min-w-0">
            <AdSlot pcAd={adsData?.BH_300x250} className="my-6" />
            <SidebarTop
              terkini={terkiniResponse.docs}
              trending={trendingResponse.docs}
              adData={adsData?.BH_Mobile_Banner_b}
            />
          </div>
        </div>
        Disyorkan
        <div className="flex mt-8">
          <DisyorkanSection data={homeData.disyorkanSection} />
        </div>
        Video Terkini
        <div className="flex mt-8">
          <VideoTerkiniSection data={homeData.videoTerkiniSection} />
        </div>
        Rencana
        <div className="flex mt-8">
          <RencanaSection data={homeData.rencanaSection} />
        </div>
        BH TV
        <div className="flex mt-8">
          <BhTvSection data={homeData.bhTvSection} />
        </div>
        Sukan
        <div className="flex mt-8">
          <SukanSection data={homeData.sukanSection} />
        </div>
        <div className="flex flex-col md:flex-row mt-8 gap-2">
          <div className="flex-[2] min-w-0 space-y-4">
            Bisnes
            <div>
              <BisnesSection data={homeData.bisnesSection} />
            </div>
            Hiburan
            <div>
              <HiburanSection data={homeData.hiburanSection} />
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
            Postcast
            <div>
              <PodcastSection data={homeData.podcastSection} />
            </div>
          </div>
        </div>
        Dunia
        <div className="flex mt-8">
          <DuniaSection data={homeData.duniaSection} />
        </div>
        <div className="grid grid-cols-1 gap-2 mt-8 lg:grid-cols-3">
          Gaya Hidup
          <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
            <GayaHidupSection data={homeData.duniaSection} />
          </div>

          Sihat
          <div className="order-2 min-w-0 lg:col-start-2 lg:row-start-1">
            <SihatSection data={homeData.sihatSection} />
          </div>

          Bh Plus - chiếm 2 cột
          <div className="order-3 min-w-0 lg:col-span-2 lg:col-start-1 lg:row-start-2">
            <BhPlusSection data={homeData.bhPlusSection} />
          </div>

          Infografik + Galeri Foto
          <div className="order-4 flex min-w-0 flex-col gap-2 lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <div className="min-h-[300px] flex-1">
              <InfografikSection data={homeData.infografikSection} />
            </div>

            <div className="min-h-[300px] flex-1">
              <GaleriFotoSection data={homeData.galeriFotoSection} />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}
