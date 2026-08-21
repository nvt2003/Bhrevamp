import { Suspense } from 'react'

import HomeSectionSkeleton from './HomeSectionSkeleton'

import HomeBisnes from './HomeBisnes'
import HomeHiburan from './HomeHiburan'
import HomePodcast from './HomePodcast'
import HomeDunia from './HomeDunia'
import HomeGayaHidup from './HomeGayaHidup'
import HomeSihat from './HomeSihat'
import HomeBhPlus from './HomeBhPlus'
import HomeInfografik from './HomeInfografik'
import HomeGaleriFoto from './HomeGaleriFoto'
import AdSlot from '@/app/(frontend)/components/AdSlot'

export default function HomeThirdSections({ adsData }: any) {
  return (
    <>
      {/* Bisnes + Hiburan + Podcast */}
      <div className="flex flex-col md:flex-row mt-8 gap-4">
        <div className="flex-[2] min-w-0 space-y-4">
          <Suspense fallback={<HomeSectionSkeleton />}>
            <div>
              <HomeBisnes />
            </div>
          </Suspense>

          <Suspense fallback={<HomeSectionSkeleton />}>
            <div>
              <HomeHiburan />
            </div>
          </Suspense>
        </div>

        <div className="flex-[1] min-w-0 space-y-4">
          <div className="flex items-center justify-center">
            <AdSlot
              pcAd={adsData?.BH_300x250_b}
              mobileAd={adsData?.BH_Mobile_Banner_b}
              className="my-6"
            />
          </div>

          <Suspense fallback={<HomeSectionSkeleton />}>
            <div>
              <HomePodcast />
            </div>
          </Suspense>
        </div>
      </div>

      {/* Dunia */}
      <Suspense fallback={<HomeSectionSkeleton />}>
        <div className="flex mt-8">
          <HomeDunia />
        </div>
      </Suspense>

      {/* Gaya Hidup + Sihat + BH Plus + Infografik + Galeri Foto */}
      <div className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
        {/* Gaya Hidup */}
        <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
          <Suspense fallback={<HomeSectionSkeleton />}>
            <HomeGayaHidup />
          </Suspense>
        </div>

        {/* Sihat */}
        <div className="order-2 min-w-0 lg:col-start-2 lg:row-start-1">
          <Suspense fallback={<HomeSectionSkeleton />}>
            <HomeSihat />
          </Suspense>
        </div>

        {/* BH Plus */}
        <div className="order-3 min-w-0 lg:col-span-2 lg:col-start-1 lg:row-start-2">
          <Suspense fallback={<HomeSectionSkeleton />}>
            <HomeBhPlus />
          </Suspense>
        </div>

        {/* Infografik + Galeri Foto */}
        <div className="order-4 flex min-w-0 flex-col gap-2 lg:col-start-3 lg:row-span-2 lg:row-start-1">
          <div className="min-h-[300px] flex-1">
            <Suspense fallback={<HomeSectionSkeleton />}>
              <HomeInfografik />
            </Suspense>
          </div>

          <div className="min-h-[300px] flex-1">
            <Suspense fallback={<HomeSectionSkeleton />}>
              <HomeGaleriFoto />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}
