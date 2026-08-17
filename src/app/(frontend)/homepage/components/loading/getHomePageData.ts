import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Hàm core fetch dữ liệu HomePage sử dụng React cache().
 * Tự động gộp các request trùng lặp trong cùng 1 lượt render trang chủ.
 */
const getRawHomePageData = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
      trending_in_top: {
        keyword: true,
        order: true,
      },
      utamaSection: {
        title: true,
        terkiniLimit: true,
        trendingLimit: true,
        featuredMain: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
            sizes: true,
          },
        },
        featuredSide: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        featuredBullet: {
          title: true,
          slug: true,
        },
        gridPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      disyorkanSection: {
        title: true,
        mainPost: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        subPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      rencanaSection: {
        title: true,
        featuredPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        sidePosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      sukanSection: {
        title: true,
        featuredPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        sidePosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      duniaSection: {
        title: true,
        featuredPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        sidePosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      bisnesSection: {
        title: true,
        featuredPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        subPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      hiburanSection: {
        title: true,
        featuredPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        subPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      gayaHidupSection: {
        title: true,
        featuredPost: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        subPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      bhPlusSection: {
        title: true,
        featuredPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        subPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      infografikSection: {
        title: true,
        linkUrl: true,
        featuredImage: {
          url: true,
          alt: true,
        },
      },
      galeriFotoSection: {
        title: true,
        galleryImages: {
          caption: true,
          image: {
            url: true,
            alt: true,
            sizes: true,
          },
        },
      },
      podcastSection: {
        title: true,
        channelLogo: {
          url: true,
          alt: true,
        },
        videos: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      bhTvSection: {
        title: true,
        channelLogo: {
          url: true,
          alt: true,
        },
        mainVideo: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        subVideos: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      videoTerkiniSection: {
        title: true,
        channelLogo: {
          url: true,
          alt: true,
        },
        videos: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
      sihatSection: {
        title: true,
        moreText: true,
        moreLink: true,
        featuredPost: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
        subPosts: {
          title: true,
          slug: true,
          featuredImage: {
            url: true,
            alt: true,
          },
        },
      },
    },
  })
})

// 1. Trending Keywords
export async function getHomeTrending() {
  const data = await getRawHomePageData()
  return data?.trending_in_top ?? null
}

// 2. Utama
export async function getHomeUtama() {
  const data = await getRawHomePageData()
  return data?.utamaSection ?? null
}

// 3. Disyorkan
export async function getHomeDisyorkan() {
  const data = await getRawHomePageData()
  return data?.disyorkanSection ?? null
}

// 4. Rencana
export async function getHomeRencana() {
  const data = await getRawHomePageData()
  return data?.rencanaSection ?? null
}

// 5. Sukan
export async function getHomeSukan() {
  const data = await getRawHomePageData()
  return data?.sukanSection ?? null
}

// 6. Dunia
export async function getHomeDunia() {
  const data = await getRawHomePageData()
  return data?.duniaSection ?? null
}

// 7. Bisnes
export async function getHomeBisnes() {
  const data = await getRawHomePageData()
  return data?.bisnesSection ?? null
}

// 8. Hiburan
export async function getHomeHiburan() {
  const data = await getRawHomePageData()
  return data?.hiburanSection ?? null
}

// 9. Gaya Hidup
export async function getHomeGayaHidup() {
  const data = await getRawHomePageData()
  return data?.gayaHidupSection ?? null
}

// 10. BH Plus
export async function getHomeBhPlus() {
  const data = await getRawHomePageData()
  return data?.bhPlusSection ?? null
}

// 11. Infografik
export async function getHomeInfografik() {
  const data = await getRawHomePageData()
  return data?.infografikSection ?? null
}

// 12. Galeri Foto
export async function getHomeGaleriFoto() {
  const data = await getRawHomePageData()
  return data?.galeriFotoSection ?? null
}

// 13. Podcast
export async function getHomePodcast() {
  const data = await getRawHomePageData()
  return data?.podcastSection ?? null
}

// 14. BH TV
export async function getHomeBhTv() {
  const data = await getRawHomePageData()
  return data?.bhTvSection ?? null
}

// 15. Video Terkini
export async function getHomeVideoTerkini() {
  const data = await getRawHomePageData()
  return data?.videoTerkiniSection ?? null
}

// 16. Sihat
export async function getHomeSihat() {
  const data = await getRawHomePageData()
  return data?.sihatSection ?? null
}
