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

    const post = await payload.create({
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
    createdSidePosts.push(Number(post.id))
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

    const post = await payload.create({
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
    createdGridPosts.push(Number(post.id))
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
  // --- TẠO BÀI DÙNG CHO DISYORKAN ---
  console.log('Đang tạo tin cho khối Disyorkan...')

  // Bài chính
  const mainDisyorkanImg = await createMediaFromUrl(
    payload,
    'https://picsum.photos/seed/es-sunlogy/800/450',
    'disyorkan-main.jpg',
    'ES Sunlogy Energy Solution',
  )
  const disyorkanMain = await payload.create({
    collection: 'posts',
    data: {
      title: 'Gugur janin guna ubat beli di TikTok, pekerja kafe dipenjara 9 bulan',
      category: categoryMap['nasional'],
      featuredImage: mainDisyorkanImg,
      status: 'published',
      publishedAt: new Date().toISOString(),
      slug: makeSlug('Gugur janin guna ubat beli di TikTok pekerja kafe dipenjara 9 bulan'),
      content: createDummyContent('Gugur janin...'),
    },
    draft: true,
    overrideAccess: true,
  })

  // 6 bài nhỏ
  const disyorkanItems = [
    { title: 'Suspek kes simbah asid pengusaha spa disambung reman 4 hari', seed: 'acid1' },
    { title: "'Geng Bob' curi sarung meter air tumpas diserbu polis", seed: 'gengbob' },
    {
      title:
        "'Saya jerit panggil nama mak su, tapi yang kedengaran hanya suara kesakitan' - Anak saudara",
      seed: 'diplomat',
    },
    { title: 'MPV terbabas, langgar pembahagi konkrit, 2 maut', seed: 'caraccident' },
    { title: 'Suspek kedua kes simbah asid pengusaha spa direman tujuh hari', seed: 'acid2' },
    {
      title: 'Gugur janin guna ubat beli di TikTok, pekerja kafe dipenjara 9 bulan',
      seed: 'citaglobal',
    },
  ]

  const createdDisyorkanSubIds: number[] = []
  for (let i = 0; i < disyorkanItems.length; i++) {
    const item = disyorkanItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/400/250`,
      `disyorkan-sub-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['kes'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
    createdDisyorkanSubIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO RENCANA ---
  console.log('Đang tạo tin cho khối Rencana...')

  // 1. 2 Bài chính (Trái & Giữa)
  const rencanaFeaturedItems = [
    {
      title: 'Sekolah Rendah Agama Sungai Udang usang, perlu bangunan baharu - Rais',
      seed: 'school-renovate',
    },
    {
      title: 'Hari akhir Sidang Kemuncak ASEAN ke-46 tumpu pengukuhan kerjasama',
      seed: 'asean-summit',
    },
  ]

  const createdRencanaFeaturedIds: number[] = []
  for (let i = 0; i < rencanaFeaturedItems.length; i++) {
    const item = rencanaFeaturedItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/600/400`,
      `rencana-featured-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
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
    createdRencanaFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách bên phải
  const rencanaSideItems = [
    {
      title: 'Mahkamah sahkan pernikahan Marissa-Aslam, perkahwinan perlu didaftar segera',
      seed: 'court-marissa',
    },
    {
      title: 'Dewan Rakyat: Isu bekalan beras, akaun media sosial antara tumpuan hari ini',
      seed: 'parliament-news',
    },
    {
      title: 'Polis kesan sindiket penyeludupan dadah guna khidmat kurier',
      seed: 'police-investigation',
    },
    {
      title: 'Pemimpin ASEAN sepakat perkasa kinh doanh và đổi mới sáng tạo khu vực',
      seed: 'asean-leaders',
    },
  ]

  const createdRencanaSideIds: number[] = []
  for (let i = 0; i < rencanaSideItems.length; i++) {
    const item = rencanaSideItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/300/200`,
      `rencana-side-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
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
    createdRencanaSideIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO SUKAN ---
  console.log('Đang tạo tin cho khối Sukan...')

  // 1. 2 Bài chính nổi bật
  const sukanFeaturedItems = [
    {
      title: 'Xabi Alonso tekad bawa Real Madrid kembali cemerlang musim depan',
      seed: 'xabi-alonso',
    },
    {
      title: 'Beregu lelaki negara mara ke suku akhir Terbuka Jepun',
      seed: 'badminton-pair',
    },
  ]

  const createdSukanFeaturedIds: number[] = []
  for (let i = 0; i < sukanFeaturedItems.length; i++) {
    const item = sukanFeaturedItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/600/400`,
      `sukan-featured-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['sukan'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
    createdSukanFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách bên phải
  const sukanSideItems = [
    {
      title: 'Sidang Khas Parlimen tumpu isu pembangunan sukan tanah air',
      seed: 'sukan-parliament',
    },
    {
      title: 'Kelab peminat Harimau Malaya lancar jersi edisi khas',
      seed: 'football-fans',
    },
    {
      title: 'Pemain badminton wanita negara kejutkan pilihan ketiga kejohanan',
      seed: 'badminton-women',
    },
    {
      title: 'Jurulatih baharu skuad kebangsaan sasar kelayakan Piala Asia',
      seed: 'coach-national',
    },
  ]

  const createdSukanSideIds: number[] = []
  for (let i = 0; i < sukanSideItems.length; i++) {
    const item = sukanSideItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/300/200`,
      `sukan-side-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['sukan'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
    createdSukanSideIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO DUNIA ---
  console.log('Đang tạo tin cho khối Dunia...')

  // 1. 2 Bài chính nổi bật
  const duniaFeaturedItems = [
    {
      title: 'Pelampau Israel serang penduduk Palestin Baitulmaqdis',
      seed: 'israel-palestine',
    },
    {
      title: 'Kami Rita Sherpa perbaharui rekod dunia daki Everest buat kali ke-31',
      seed: 'everest-sherpa',
    },
  ]

  const createdDuniaFeaturedIds: number[] = []
  for (let i = 0; i < duniaFeaturedItems.length; i++) {
    const item = duniaFeaturedItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/600/400`,
      `dunia-featured-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['dunia'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
    createdDuniaFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách bên phải
  const duniaSideItems = [
    {
      title: 'Pegawai tinggi kementerian Indonesia disiasat seleweng berbilion rupiah',
      seed: 'indonesia-money',
    },
    {
      title: 'Arab Saudi kuatkuasa sekatan visa bagi negara tertentu',
      seed: 'mecca-saudi',
    },
    {
      title: "2 maut, 9 cedera dalam kes tembakan 'Memorial Day' di AS",
      seed: 'us-police',
    },
    {
      title: 'Remaja ditahan sebar ekstremisme dalam talian di Sulawesi',
      seed: 'sulawesi-arrest',
    },
  ]

  const createdDuniaSideIds: number[] = []
  for (let i = 0; i < duniaSideItems.length; i++) {
    const item = duniaSideItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/300/200`,
      `dunia-side-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['dunia'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
    createdDuniaSideIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO BISNES ---
  console.log('Đang tạo tin cho khối Bisnes...')

  // 1. 2 Bài nổi bật phía trên
  const bisnesFeaturedItems = [
    {
      title: 'Peugeot 3008: Simfoni keanggunan Eropah di jalanan Malaysia',
      seed: 'kwasaland-property',
    },
    {
      title: 'Titijaya beli dua aset hartanah bernilai RM105 juta di Kota Kinabalu',
      seed: 'titijaya-press',
    },
  ]

  const createdBisnesFeaturedIds: number[] = []
  for (let i = 0; i < bisnesFeaturedItems.length; i++) {
    const item = bisnesFeaturedItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/600/400`,
      `bisnes-featured-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['bisnes'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
    createdBisnesFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách phía dưới (Grid 2x2)
  const bisnesSubItems = [
    {
      title: 'Mahkamah sahkan pernikahan Marissa-Aslam, perkahwinan perlu didaftar segera',
      seed: 'business-ceo-1',
    },
    {
      title: 'Kadar inflasi Malaysia kekal stabil pada suku kedua tahun ini',
      seed: 'business-man-2',
    },
    {
      title: 'Syarikat kesihatan tempatan jalin kerjasama strategik peluasan pasaran',
      seed: 'corporate-signing',
    },
    {
      title: 'Sektor perbankan dijangka terus kukuh dipacu pertumbuhan domestik',
      seed: 'building-corporate',
    },
  ]

  const createdBisnesSubIds: number[] = []
  for (let i = 0; i < bisnesSubItems.length; i++) {
    const item = bisnesSubItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/300/200`,
      `bisnes-sub-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['bisnes'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
    createdBisnesSubIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO HIBURAN ---
  console.log('Đang tạo tin cho khối Hiburan...')

  // 1. 2 Bài nổi bật phía trên
  const hiburanFeaturedItems = [
    {
      title: 'Paduan suara anak penyanyi legenda',
      seed: 'singing-duo',
    },
    {
      title: 'Amar, Qobin mungkin akhiri kembara berbasikal di Madinah',
      seed: 'cyclist-travel',
    },
  ]

  const createdHiburanFeaturedIds: number[] = []
  for (let i = 0; i < hiburanFeaturedItems.length; i++) {
    const item = hiburanFeaturedItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/600/400`,
      `hiburan-featured-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['hiburan'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
    createdHiburanFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách phía dưới (Grid 2x2)
  const hiburanSubItems = [
    {
      title: 'Konsert jelajah artis tempatan mendapat sambutan hangat penyokong',
      seed: 'stage-concert',
    },
    {
      title: 'Pelakon popular impi watak mencabar dalam filem aksi terbaharu',
      seed: 'actor-suit',
    },
    {
      title: 'Filem animasi tempatan catat kutipan tertinggi di panggung',
      seed: 'celebrity-family',
    },
    {
      title: 'Pasangan selebriti berkongsi detik manis sambutan ulang tahun',
      seed: 'celebrity-couple',
    },
  ]

  const createdHiburanSubIds: number[] = []
  for (let i = 0; i < hiburanSubItems.length; i++) {
    const item = hiburanSubItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/300/200`,
      `hiburan-sub-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['hiburan'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
    createdHiburanSubIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO GAYA HIDUP ---
  console.log('Đang tạo tin cho khối Gaya Hidup...')

  // 1. Bài chính nổi bật phía trên
  const gayaHidupMainImg = await createMediaFromUrl(
    payload,
    'https://picsum.photos/seed/skincare-girl/600/400',
    'gaya-hidup-main.jpg',
    'Gaya Hidup Main',
  )
  const gayaHidupMain = await payload.create({
    collection: 'posts',
    data: {
      title: 'Paduan suara anak penyanyi legenda',
      category: categoryMap['gaya-hidup'] || categoryMap['nasional'],
      featuredImage: gayaHidupMainImg,
      status: 'published',
      publishedAt: new Date().toISOString(),
      slug: makeSlug('Paduan suara anak penyanyi legenda gaya hidup'),
      content: createDummyContent('Paduan suara anak penyanyi legenda...'),
    },
    draft: true,
    overrideAccess: true,
  })

  // 2. 4 Bài danh sách phía dưới
  const gayaHidupSubItems = [
    {
      title: 'Cipta kenangan indah di Lexis Hibiscus Port Dickson',
      seed: 'lexis-resort',
    },
    {
      title: 'Tiram Sungai Merbok',
      seed: 'merbok-oyster',
    },
    {
      title: '5 cara jadikan susu lebih menyeronokkan untuk kanak-kanak',
      seed: 'child-drinking-milk',
    },
    {
      title: 'Sabar dan ikhlas laksana tugas jaga warga emas',
      seed: 'caregiver-elderly',
    },
  ]

  const createdGayaHidupSubIds: number[] = []
  for (let i = 0; i < gayaHidupSubItems.length; i++) {
    const item = gayaHidupSubItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/300/200`,
      `gaya-hidup-sub-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['gaya-hidup'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
    })
    createdGayaHidupSubIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO BH PLUS ---
  console.log('Đang tạo tin cho khối BH Plus...')

  // 1. 2 Bài nổi bật phía trên
  const bhPlusFeaturedItems = [
    {
      title: 'Paduan suara anak penyanyi legenda',
      seed: 'singers-duo',
    },
    {
      title: 'Amar, Qobin mungkin akhiri kembara berbasikal di Madinah',
      seed: 'cyclist-madinah',
    },
  ]

  const createdBhPlusFeaturedIds: number[] = []
  for (let i = 0; i < bhPlusFeaturedItems.length; i++) {
    const item = bhPlusFeaturedItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/600/400`,
      `bhplus-featured-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
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
    createdBhPlusFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách phía dưới (Grid 2x2)
  const bhPlusSubItems = [
    {
      title: 'Gusmao beri pengamal media coklat',
      seed: 'gusmao-chocolate',
    },
    {
      title: "Barisan ASEAN All-Stars tekad 'malukan' United",
      seed: 'asean-united',
    },
    {
      title: 'Eksperimen individu Cklamovski',
      seed: 'coach-experiment',
    },
    {
      title: 'Kerajaan negeri tunggu laporan penuh insiden murid dimarahi guru - Amirudin',
      seed: 'education-report',
    },
  ]

  const createdBhPlusSubIds: number[] = []
  for (let i = 0; i < bhPlusSubItems.length; i++) {
    const item = bhPlusSubItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/300/200`,
      `bhplus-sub-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
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
    createdBhPlusSubIds.push(Number(post.id))
  }
  // --- TẠO DỮ LIỆU CHO KHỐI INFOGRAFIK ---
  console.log('Đang tạo dữ liệu cho khối Infografik...')

  const infografikImgId = await createMediaFromUrl(
    payload,
    'https://picsum.photos/seed/asean-infographic/800/1130',
    'infografik-asean.jpg',
    'ASEAN Handshake Infografik',
  )
  // --- TẠO DỮ LIỆU CHO KHỐI GALERI FOTO ---
  console.log('Đang tạo dữ liệu cho khối Galeri Foto...')

  // Tạo mảng gồm 32 ảnh ngẫu nhiên tượng trưng cho grid ảnh phong phú
  const galleryItems = []
  for (let i = 1; i <= 32; i++) {
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/galeri-photo-${i}/400/300`,
      `galeri-photo-${i}.jpg`,
      `Foto Galeri ${i}`,
    )
    galleryItems.push({
      image: imgId,
      caption: `Gambar galeri ${i}`,
    })
  }
  // --- TẠO DỮ LIỆU CHO KHỐI PODCAST ---
  console.log('Đang tạo tin cho khối Podcast...')

  // 1. Tạo hoặc lấy logo tạm thời (BH TV Badge)
  const podcastLogoImg = await createMediaFromUrl(
    payload,
    'https://picsum.photos/seed/bhtv-logo/100/100',
    'bhtv-logo.jpg',
    'BH TV Logo',
  )

  // 2. Tạo 3 video podcast
  const podcastItems = [
    {
      title: 'Impak positif kenaikan gaji minimum bakal dirasai semua lapisan',
      seed: 'podcast-guest-1',
    },
    {
      title: 'Bawa pulang pekerja mahir, hartawan mampu tingkat ekonomi negara - Nazri Khan',
      seed: 'podcast-guest-2',
    },
    {
      title: "Belanjawan 2025 bukan 'hukuman' kepada golongan mahakaya, T15",
      seed: 'podcast-studio-3',
    },
  ]

  const createdPodcastIds: number[] = []
  for (let i = 0; i < podcastItems.length; i++) {
    const item = podcastItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/600/350`,
      `podcast-thumb-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
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
    createdPodcastIds.push(Number(post.id))
  }

  console.log('Đang liên kết dữ liệu vào Global HomePage...')

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      utamaSection: {
        title: 'Utama',
        featuredMain: mainPost.id,
        featuredSide: createdSidePosts,
        featuredBullet: [bullet1.id, bullet2.id, bullet3.id],
        gridPosts: createdGridPosts,
        terkiniLimit: 5,
        trendingLimit: 5,
      },
      disyorkanSection: {
        title: 'Disyorkan',
        mainPost: disyorkanMain.id,
        subPosts: createdDisyorkanSubIds,
      },
      rencanaSection: {
        title: 'Rencana',
        featuredPosts: createdRencanaFeaturedIds,
        sidePosts: createdRencanaSideIds,
      },
      sukanSection: {
        title: 'Sukan',
        featuredPosts: createdSukanFeaturedIds,
        sidePosts: createdSukanSideIds,
      },
      duniaSection: {
        title: 'Dunia',
        featuredPosts: createdDuniaFeaturedIds,
        sidePosts: createdDuniaSideIds,
      },
      bisnesSection: {
        title: 'Bisnes',
        featuredPosts: createdBisnesFeaturedIds,
        subPosts: createdBisnesSubIds,
      },
      hiburanSection: {
        title: 'Hiburan',
        featuredPosts: createdHiburanFeaturedIds,
        subPosts: createdHiburanSubIds,
      },
      gayaHidupSection: {
        title: 'Gaya Hidup',
        featuredPost: gayaHidupMain.id,
        subPosts: createdGayaHidupSubIds,
      },
      bhPlusSection: {
        title: 'BH Plus',
        featuredPosts: createdBhPlusFeaturedIds,
        subPosts: createdBhPlusSubIds,
      },
      infografikSection: {
        title: 'Infografik',
        featuredImage: infografikImgId,
        linkUrl: '/infografik/asean-handshake',
      },
      galeriFotoSection: {
        title: 'Galeri Foto',
        galleryImages: galleryItems,
      },
      podcastSection: {
        title: 'Podcast',
        channelLogo: podcastLogoImg,
        videos: createdPodcastIds,
      },
    },
  })
  console.log('Khởi tạo toàn bộ dữ liệu Posts thành công!')
}
