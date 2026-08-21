import React, { Suspense } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import TrendingBar from '../components/TrendingBar'
import FloatingWidget from '../components/FloatingWidget'
import UtamaSection from './components/display/UtamaSection'
import SidebarTop from './components/display/SidebarTop'
import AdSlot from '../components/AdSlot'
import MobileStickyAd from './components/display/MobileStickyAd'
import {
  getHomeTrending,
  getHomeUtama,
  getVideoWidgets,
} from './components/loading/getHomePageData'
import { Metadata } from 'next'
import HomeSecondarySections from './components/loading/HomeSecondarySections'
import HomeThirdSections from './components/loading/HomeThirdSections'
import HomeSectionSkeleton from './components/loading/HomeSectionSkeleton'
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Homepage',
    description: 'News',
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [adsData, widgetData, trending_in_top, utama] = await Promise.all([
    payload.findGlobal({ slug: 'ads-config', depth: 2 }),
    getVideoWidgets(),
    getHomeTrending(),
    getHomeUtama(),
  ])

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
      {trending_in_top && <TrendingBar data={trending_in_top} />}
      <FloatingWidget data={widgetData} />
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
        <Suspense fallback={<HomeSectionSkeleton />}>
          <HomeSecondarySections />
        </Suspense>

        <Suspense fallback={<HomeSectionSkeleton />}>
          <HomeThirdSections />
        </Suspense>
      </div>
    </div>
  )
}
