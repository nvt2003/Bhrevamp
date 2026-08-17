import { Suspense } from 'react'
import HomeDisyorkan from './HomeDisyorkan'
import HomeRencana from './HomeRencana'
import HomeSukan from './HomeSukan'
import HomeSectionSkeleton from './HomeSectionSkeleton'
import HomeVideoTerkin from './HomeVideoTerkini'
import HomeBhT from './HomeBhTv'

export default function HomeSecondarySections() {
  return (
    <>
      <Suspense fallback={<HomeSectionSkeleton />}>
        <HomeDisyorkan />
      </Suspense>

      <Suspense fallback={<HomeSectionSkeleton />}>
        <HomeVideoTerkin />
      </Suspense>

      <Suspense fallback={<HomeSectionSkeleton />}>
        <HomeRencana />
      </Suspense>

      <Suspense fallback={<HomeSectionSkeleton />}>
        <HomeBhT />
      </Suspense>

      <Suspense fallback={<HomeSectionSkeleton />}>
        <HomeSukan />
      </Suspense>
    </>
  )
}
