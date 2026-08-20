// src/lib/getHeader.ts
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'

export const getCachedHeader = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    return payload.findGlobal({
      slug: 'header',
      depth: 3,
      select: {
        sliders: {
          title: true,
          slug: true,

          category: {
            name: true,
            slug: true,

            parent: {
              name: true,
              slug: true,
            },
          },

          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
    })
  },
  ['global-header-data'], // Key cache duy nhất
  {
    tags: ['global-header'], // Tag dùng để xóa cache khi admin chỉnh sửa
    revalidate: 3600, // (Tùy chọn) Tự động làm mới sau 1 giờ (3600s)
  },
)
