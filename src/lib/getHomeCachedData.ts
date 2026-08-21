import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getHomeUtama } from '@/app/(frontend)/homepage/components/loading/getHomePageData'

// 1. Cache phần Utama
export const getHomeUtamaCached = unstable_cache(
  async () => {
    // Gọi hàm getHomeUtama gốc của bạn ở đây
    return await getHomeUtama()
  },
  ['home-utama-data'], // Key cache
  {
    tags: ['home-utama', 'posts'], // Tag để xả cache khi cập nhật bài viết/utama
    revalidate: 300, // Tự động làm mới sau 5 phút nếu không có thay đổi
  },
)

// 2. Cache Ads Config
export const getAdsConfigCached = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    return await payload.findGlobal({ slug: 'ads-config', depth: 2 })
  },
  ['home-ads-config'],
  {
    tags: ['ads-config'],
  },
)
