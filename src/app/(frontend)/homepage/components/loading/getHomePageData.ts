import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

async function getHomePayload() {
  return getPayload({ config })
}

// 1. Trending Keywords
export async function getHomeTrending() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
      trending_in_top: {
        keyword: true,
        order: true,
      },
    },
  })

  return data.trending_in_top
}

// 2. Utama
export async function getHomeUtama() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.utamaSection
}

// 3. Disyorkan
export async function getHomeDisyorkan() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.disyorkanSection
}

// 4. Rencana
export async function getHomeRencana() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.rencanaSection
}

// 5. Sukan
export async function getHomeSukan() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.sukanSection
}

// 6. Dunia
export async function getHomeDunia() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.duniaSection
}

// 7. Bisnes
export async function getHomeBisnes() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.bisnesSection
}

// 8. Hiburan
export async function getHomeHiburan() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.hiburanSection
}

// 9. Gaya Hidup
export async function getHomeGayaHidup() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.gayaHidupSection
}

// 10. BH Plus
export async function getHomeBhPlus() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.bhPlusSection
}

// 11. Infografik
export async function getHomeInfografik() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
      infografikSection: {
        title: true,
        linkUrl: true,
        featuredImage: {
          url: true,
          alt: true,
        },
      },
    },
  })

  return data.infografikSection
}

// 12. Galeri Foto
export async function getHomeGaleriFoto() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.galeriFotoSection
}

// 13. Podcast
export async function getHomePodcast() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.podcastSection
}

// 14. BH TV
export async function getHomeBhTv() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.bhTvSection
}

// 15. Video Terkini
export async function getHomeVideoTerkini() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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
    },
  })

  return data.videoTerkiniSection
}

// 16. Sihat
export async function getHomeSihat() {
  const payload = await getHomePayload()

  const data = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
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

  return data.sihatSection
}
