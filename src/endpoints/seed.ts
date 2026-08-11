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

  console.log('Đang khởi tạo dữ liệu mẫu cho Categories và Posts...')

  // 2. Tạo hoặc lấy Categories
  const categoriesToSeed = [
    { name: 'NASIONAL', slug: 'nasional' },
    { name: 'WILAYAH', slug: 'wilayah' },
    { name: 'KES', slug: 'kes' },
  ]

  const categoryMap: Record<string, number> = {}

  for (const cat of categoriesToSeed) {
    const createdCat = await payload.create({
      collection: 'categories',
      data: cat,
      overrideAccess: true,
    })
    categoryMap[cat.slug] = Number(createdCat.id)
  }

  // 3. Tạo các bài viết dạng Bullet List trước (cho phần tin nhanh không ảnh)
  console.log('Đang tạo các tin Bullet List...')
  const bullet1 = await payload.create({
    collection: 'utama',
    data: {
      title: "Laporan nahas Air India: Juruterbang 'keliru' cara guna suis enjin",
      slug: 'laporan-nahas-air-india-juruterbang-keliru-cara-guna-suis-enjin',
      category: categoryMap['nasional'],
      position: 'featured_bullet',
    },
    overrideAccess: true,
  })

  const bullet2 = await payload.create({
    collection: 'utama',
    data: {
      title: 'Persatuan juruterbang tolak dakwaan kesilapan manusia punca nahas Air India',
      slug: 'persatuan-juruterbang-tolak-dakwaan-kesilapan-manusia-punca-nahas-air-india',
      category: categoryMap['nasional'],
      position: 'featured_bullet',
    },
    overrideAccess: true,
  })

  const bullet3 = await payload.create({
    collection: 'utama',
    data: {
      title: 'Remaja dituduh rogol pelajar dalam stor sekolah',
      slug: 'remaja-dituduh-rogol-pelajar-dalam-stor-sekolah',
      category: categoryMap['nasional'],
      position: 'featured_bullet',
    },
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

  await payload.create({
    collection: 'utama',
    data: {
      title: 'Kapten pesawat Air India matikan suis kawal aliran bahan api ke enjin - WSJ',
      excerpt:
        'KUALA LUMPUR: Kerajaan akan tetap melaksanakan rasionalisasi subsidi RON95 seperti yang dirancang pada..',
      category: categoryMap['nasional'],
      position: 'featured_main',
      featuredImage: mainImageId,
      relatedPosts: [bullet1.id, bullet2.id, bullet3.id] as number[],
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

  for (let i = 0; i < sidePosts.length; i++) {
    const item = sidePosts[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.imgSeed}/400/250`,
      `side-${i}.jpg`,
      item.title,
    )

    await payload.create({
      collection: 'utama',
      data: {
        title: item.title,
        category: categoryMap['nasional'],
        position: 'featured_side',
        featuredImage: imgId,
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

  for (let i = 0; i < gridPosts.length; i++) {
    const item = gridPosts[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.imgSeed}/500/300`,
      `grid-${i}.jpg`,
      item.title,
    )

    await payload.create({
      collection: 'utama',
      data: {
        title: item.title,
        category: categoryMap[item.catSlug],
        position: 'grid',
        featuredImage: imgId,
      },
      draft: true,
      overrideAccess: true,
    })
  }

  console.log('Khởi tạo toàn bộ dữ liệu Posts thành công!')
}
