import { Payload } from 'payload'

// Helper function tải ảnh từ URL ngoài và tạo record trong collection 'media'
const createMediaFromUrl = async (
  payload: Payload,
  imageUrl: string,
  imageName: string,
  altText: string,
) => {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const media = await payload.create({
      collection: 'media',
      data: {
        alt: altText,
      },
      file: {
        data: buffer,
        mimetype: response.headers.get('content-type') || 'image/jpeg',
        name: imageName,
        size: buffer.length,
      },
      overrideAccess: true,
    })

    return media.id
  } catch (error) {
    console.error(`Không thể tải ảnh (${imageUrl}):`, error)
    return null
  }
}
// Helper tạo cấu trúc content chuẩn cho Payload Lexical / RichText
const createDummyContent = (text: string) => ({
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: text,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    type: 'root',
    version: 1,
  },
})
export const seedPosts = async (payload: Payload) => {
  // 1. Kiểm tra xem posts đã tồn tại chưa
  const existingPosts = await payload.find({
    collection: 'posts',
    limit: 1,
  })

  if (existingPosts.totalDocs > 0) {
    console.log('Dữ liệu Posts đã tồn tại, bỏ qua Seed.')
    return
  }
  // Helper tạo slug không bao giờ trùng
  const makeSlug = (text: string) => {
    const baseSlug = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9 -]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    // Thêm suffix ngắn để đảm bảo unique tuyệt đối khi Seed
    return `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`
  }
  console.log('Đang khởi tạo dữ liệu mẫu cho Categories và Posts...')

  // 2. Tạo hoặc lấy Categories
  const categoriesToSeed = [
    { name: 'NASIONAL', slug: 'nasional' },
    { name: 'WILAYAH', slug: 'wilayah' },
    { name: 'KES', slug: 'kes' },
    { name: 'SUKAN', slug: 'sukan' },
  ]

  const categoryMap: Record<string, number> = {}

  for (const cat of categoriesToSeed) {
    const existing = await payload.find({
      collection: 'categories',
      where: {
        slug: {
          equals: cat.slug,
        },
      },
    })

    if (existing.docs.length > 0) {
      // Nếu đã có thì lấy luôn ID
      categoryMap[cat.slug] = existing.docs[0].id as number
    } else {
      const createdCat = await payload.create({
        collection: 'categories',
        data: { name: String(cat.name).trim(), slug: String(cat.slug).trim().toLowerCase() },
        overrideAccess: true,
      })
      categoryMap[cat.slug] = Number(createdCat.id)
    }
  }

  // 3. Tạo các bài viết dạng Bullet List trước (cho phần tin nhanh không ảnh)
  console.log('Đang tạo các tin Bullet List...')
  const bullet1 = await payload.create({
    collection: 'posts',
    data: {
      title: "Laporan nahas Air India: Juruterbang 'keliru' cara guna suis enjin",
      slug: makeSlug('Laporan nahas Air India Juruterbang keliru cara guna suis enjin'),
      category: categoryMap['nasional'],
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: createDummyContent(
        "Laporan nahas Air India: Juruterbang 'keliru' cara guna suis enjin",
      ),
    },
    draft: true,
    overrideAccess: true,
  })

  const bullet2 = await payload.create({
    collection: 'posts',
    data: {
      title: 'Persatuan juruterbang tolak dakwaan kesilapan manusia punca nahas Air India',
      slug: makeSlug('persatuan-juruterbang-tolak-dakwaan-kesilapan-manusia-punca-nahas-air-india'),
      category: categoryMap['nasional'],
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: createDummyContent(
        'Persatuan juruterbang tolak dakwaan kesilapan manusia punca nahas Air India',
      ),
    },
    draft: true,
    overrideAccess: true,
  })

  const bullet3 = await payload.create({
    collection: 'posts',
    data: {
      title: 'Remaja dituduh rogol pelajar dalam stor sekolah',
      slug: makeSlug('remaja-dituduh-rogol-pelajar-dalam-stor-sekolah'),
      category: categoryMap['nasional'],
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: createDummyContent('Remaja dituduh rogol pelajar dalam stor sekolah'),
    },
    draft: true,
    overrideAccess: true,
  })

  // 4. Tạo bài viết Featured Main (Tin lớn nổi bật bên phải)
  console.log('Đang tạo bài viết Featured Main...')
  const mainImageId = await createMediaFromUrl(
    payload,
    'https://picsum.photos/seed/airindia/800/500',
    'airindia-crash.jpg',
    'Kapten pesawat Air India',
  )
  const mainPost = await payload.create({
    collection: 'posts',
    data: {
      title: 'Kapten pesawat Air India matikan suis kawal aliran bahan api ke enjin - WSJ',
      slug: makeSlug('Kapten pesawat Air India matikan suis kawal aliran bahan api ke enjin WSJ'),
      excerpt:
        'KUALA LUMPUR: Kerajaan akan tetap melaksanakan rasionalisasi subsidi RON95 seperti yang dirancang pada..',
      category: categoryMap['nasional'],
      featuredImage: mainImageId,
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: createDummyContent(
        'Kapten pesawat Air India matikan suis kawal aliran bahan api ke enjin - WSJ',
      ),
    },
    draft: true,
    overrideAccess: true,
  })

  // 5. Tạo danh sách tin Sidebar bên trái (Dạng ảnh nhỏ xếp dọc)
  console.log('Đang tạo tin Sidebar bên trái...')
  const sidePosts = [
    { title: 'Perang Israel-Iran tidak mengubah nasib Gaza', imgSeed: 'gaza' },
    { title: 'Azam Baki mohon maaf kepada keluarga Teoh Beng Hock', imgSeed: 'azam' },
    { title: 'Projek LRT Laluan Mutiara dijangka beri manfaat 1.8 juta orang', imgSeed: 'lrt' },
    {
      title: 'Aplikasi Saudi Visa Bio, pencapaian dasar luar negara tumpuan Dewan...',
      imgSeed: 'visa',
    },
  ]
  const createdSidePosts: number[] = []
  for (let i = 0; i < sidePosts.length; i++) {
    const item = sidePosts[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.imgSeed}/400/250`,
      `side-${i}.jpg`,
      item.title,
    )

    await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
  }

  // 6. Tạo danh sách tin ở lưới phía dưới (Grid 3 cột)
  console.log('Đang tạo các bài viết dạng Grid...')
  const gridPosts = [
    {
      title:
        'Penyertaan media ASEAN pada program HAWANA buka peluang wartawan tukar pengalaman, kepakaran',
      catSlug: 'nasional',
      imgSeed: 'asean1',
    },
    {
      title: 'Dedikasi media ASEAN demi liputan terbaik di sidang kemuncak',
      catSlug: 'nasional',
      imgSeed: 'asean2',
    },
    {
      title: 'Kepusatan, persaudaraan ASEAN penting hadapi cabaran global - PM Anwar',
      catSlug: 'nasional',
      imgSeed: 'asean3',
    },
    {
      title: 'Pelajar cedera terjatuh di tengah jalan raya selepas dikejar tiga anjing liar',
      catSlug: 'wilayah',
      imgSeed: 'accident',
    },
    {
      title: 'Polis tahan 2 lelaki terbabit kes samun',
      catSlug: 'kes',
      imgSeed: 'police1',
    },
    {
      title:
        "'Dua tahun pemilik kedai emas terpaksa bayar duit perlindungan sebelum diculik' - Polis",
      catSlug: 'nasional',
      imgSeed: 'police2',
    },
    {
      title: 'Kerjasama kukuh mantapkan pertumbuhan negara BIMP-EAGA - Presiden Marcos Jr',
      catSlug: 'nasional',
      imgSeed: 'summit',
    },
    {
      title: 'Lipas di dapur, medan selera diarah tutup 14 hari',
      catSlug: 'kes',
      imgSeed: 'food',
    },
    {
      title: 'Deklarasi Kuala Lumpur 2045 visi strategik pacu komuniti ASEAN',
      catSlug: 'nasional',
      imgSeed: 'declaration',
    },
  ]
  const createdGridPosts: number[] = []
  for (let i = 0; i < gridPosts.length; i++) {
    const item = gridPosts[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.imgSeed}/500/300`,
      `grid-${i}.jpg`,
      item.title,
    )

    await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap[item.catSlug],
        status: 'published',
        publishedAt: new Date().toISOString(),
        featuredImage: imgId,
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
  }
  console.log('Đang tạo dữ liệu Terkini và Trending...')

  const terkiniAndTrendingItems = [
    {
      title: 'Mahkamah sahkan pernikahan Marissa-Aslam, perkahwinan perlu didaftar segera',
      catSlug: 'kes',
      imgSeed: 'police-car',
      isTrending: true,
    },
    {
      title: "Sarawak mahu 'timba ilmu' Sukan SEA Thailand",
      catSlug: 'sukan',
      imgSeed: 'sea-games',
      isTrending: true,
    },
    {
      title: 'Isu perselisihan antara Orang Asli, polis di Pekan, Sabtu lalu selesai',
      catSlug: 'kes',
      imgSeed: 'meeting-signing',
      isTrending: true,
    },
    {
      title:
        'Mahkamah sahkan pernikahan Marissa-Aslam, perkahwinan perlu didaftaChina sedia perkukuh...',
      catSlug: 'nasional',
      imgSeed: 'press-conference',
      isTrending: true,
    },
    {
      title: 'Dana pelaburan RM150 juta rombak landskap hartanah tempatan',
      catSlug: 'nasional',
      imgSeed: 'investment-handshake',
      isTrending: true,
    },
  ]

  for (let i = 0; i < terkiniAndTrendingItems.length; i++) {
    const item = terkiniAndTrendingItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.imgSeed}/300/200`,
      `terkini-${i + 1}.jpg`,
      item.title,
    )

    await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        slug: makeSlug(item.title),
        category: categoryMap[item.catSlug],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date(Date.now() - i * 9 * 60 * 1000).toISOString(), // Giả lập cách nhau 9 phút
        isTrending: item.isTrending,
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
  }
  console.log('Đang liên kết dữ liệu vào Global HomePage...')

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      sections: [
        {
          blockType: 'categorySection',
          title: 'Utama',
          featuredMain: mainPost.id,
          featuredSide: createdSidePosts,
          featuredBullet: [bullet1.id, bullet2.id, bullet3.id],
          gridPosts: createdGridPosts,
        },
      ],
    } as any,
  })
  console.log('Khởi tạo toàn bộ dữ liệu Posts thành công!')
}
