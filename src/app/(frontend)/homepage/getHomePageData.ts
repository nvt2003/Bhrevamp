import { getPayload } from 'payload'
import config from '@payload-config'

export async function getHomePageData() {
  const payload = await getPayload({ config })

  const homeData = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
    select: {
      // 1. Trending Keywords
      trending_in_top: {
        keyword: true,
        order: true,
      },

      // 2. KHỐI UTAMA
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

      // 3. KHỐI DISYORKAN
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

      // 4. KHỐI RENCANA
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

      // 5. KHỐI SUKAN
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

      // 6. KHỐI DUNIA
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

      // 7. KHỐI BISNES
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

      // 8. KHỐI HIBURAN
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

      // 9. KHỐI GAYA HIDUP
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

      // 10. KHỐI BH PLUS
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

      // 11. KHỐI INFOGRAFIK
      infografikSection: {
        title: true,
        linkUrl: true,
        featuredImage: {
          url: true,
          alt: true,
        },
      },

      // 12. KHỐI GALERI FOTO
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

      // 13. KHỐI PODCAST
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

      // 14. KHỐI BH TV
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

      // 15. KHỐI VIDEO TERKINI
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

      // 16. KHỐI SIHAT
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

  return homeData
}
