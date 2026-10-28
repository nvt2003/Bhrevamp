import 'dotenv/config'
import { getPayload, Payload } from 'payload'
import configPromise from '@payload-config'

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

const categoriesToSeed = [
  { name: 'Nổi bật', slug: 'noi-bat' },
  { name: 'Trong nước', slug: 'trong-nuoc' },
  { name: 'Thể thao', slug: 'the-thao' },
  { name: 'Kinh tế', slug: 'kinh-te' },
  { name: 'Phụ nữ', slug: 'phu-nu' },
  { name: 'Giải trí', slug: 'giai-tri' },
  { name: 'Quốc tế', slug: 'quoc-te' },
  { name: 'Sức khỏe', slug: 'suc-khoe' },
  { name: 'Phong cách sống', slug: 'phong-cach-song' },
]
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

  console.log('Đang khởi tạo dữ liệu mẫu cho Posts...')

  // 3. Tạo các bài viết dạng Bullet List trước (cho phần tin nhanh không ảnh)
  console.log('Đang tạo các tin Bullet List...')
  const bullet1 = await payload.create({
    collection: 'posts',
    data: {
      title: 'Thị trường xe điện Việt Nam tăng trưởng mạnh mẽ',
      slug: makeSlug('thi-truong-xe-dien-viet-nam-tang-truong-manh-men'),
      category: categoryMap['kinh-te'],
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: createDummyContent('Thị trường xe điện Việt Nam tăng trưởng mạnh mẽ'),
    },
    draft: true,
    overrideAccess: true,
    context: {
      skipRevalidation: true,
    },
  })

  const bullet2 = await payload.create({
    collection: 'posts',
    data: {
      title: 'Công nghệ AI bùng nổ trong năm 2026, nhiều ngành nghề bị ảnh hưởng',
      slug: makeSlug('cong-nghe-ai-bung-no-trong-nam-2026-nhieu-nganh-nghe-bi-anh-huong'),
      category: categoryMap['kinh-te'],
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: createDummyContent(
        'Công nghệ AI bùng nổ trong năm 2026, nhiều ngành nghề bị ảnh hưởng',
      ),
    },
    draft: true,
    overrideAccess: true,
    context: {
      skipRevalidation: true,
    },
  })

  const bullet3 = await payload.create({
    collection: 'posts',
    data: {
      title: 'Chế độ ăn uống lành mạnh và cân bằng cho người làm văn phòng',
      slug: makeSlug('che-do-an-uong-lanh-mau-va-can-bang-cho-nguoi-lam-van-phong'),
      category: categoryMap['suc-khoe'],
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: createDummyContent('Chế độ ăn uống lành mạnh và cân bằng cho người làm văn phòng'),
    },
    draft: true,
    overrideAccess: true,
    context: {
      skipRevalidation: true,
    },
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
      title: 'Hội nghị Thượng đỉnh Khí hậu Quốc tế đạt thỏa thuận lịch sử',
      slug: makeSlug('Hoi-nghi-Thuong-dinh-Khi-hau-Quoc-te-dat-thoa-thuan-luat-su'),
      excerpt:
        'Hơn 190 quốc gia cam kết cắt giảm khí thải nhà kính và tăng cường ngân sách chuyển đổi năng lượng xanh.',
      category: categoryMap['quoc-te'],
      featuredImage: mainImageId,
      status: 'published',
      publishedAt: new Date().toISOString(),
      content: createDummyContent(
        'Hơn 190 quốc gia cam kết cắt giảm khí thải nhà kính và tăng cường ngân sách chuyển đổi năng lượng xanh.',
      ),
    },
    draft: true,
    overrideAccess: true,
    context: {
      skipRevalidation: true,
    },
  })

  // 5. Tạo danh sách tin Sidebar bên trái (Dạng ảnh nhỏ xếp dọc)
  console.log('Đang tạo tin Sidebar bên trái...')
  const sidePosts = [
    {
      title: 'Liên minh Châu Âu thông qua bộ luật mới về quản lý Trí tuệ Nhân tạo',
      imgSeed: 'gaza',
    },
    { title: 'Kinh tế Đông Nam Á tiếp tục là điểm sáng tăng trưởng toàn cầu', imgSeed: 'azam' },
    { title: 'Đội tuyển Việt Nam thắng nghẹt thở ở phút bù giờ', imgSeed: 'lrt' },
    {
      title: 'Căng thẳng cuộc đua vô địch giải Ngoại hạng Anh',
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
        category: categoryMap['noi-bat'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdSidePosts.push(Number(post.id))
  }

  // 6. Tạo danh sách tin ở lưới phía dưới (Grid 3 cột)
  console.log('Đang tạo các bài viết dạng Grid...')
  const gridPosts = [
    {
      title: 'Phương pháp giáo dục cá nhân hóa cho học sinh',
      catSlug: 'trong-nuoc',
      imgSeed: 'asean1',
    },
    {
      title: 'Nhật Bản và Hàn Quốc đẩy mạnh hợp tác công nghệ bán dẫn',
      catSlug: 'quoc-te',
      imgSeed: 'asean2',
    },
    {
      title: 'Xu hướng làm việc từ xa lan rộng tại các tập đoàn đa quốc gia',
      catSlug: 'quoc-te',
      imgSeed: 'asean3',
    },
    {
      title: 'Tổ chức Y tế Thế giới cảnh báo về đợt dịch cúm mùa tại Châu Âu',
      catSlug: 'suc-khoe',
      imgSeed: 'accident',
    },
    {
      title: 'Đội tuyển bóng rổ Mỹ công bố đội hình tham dự giải vô địch thế giới',
      catSlug: 'the-thao',
      imgSeed: 'police1',
    },
    {
      title: 'Giải đua xe Công thức 1 (F1): Chặng đua kịch tính dưới mưa',
      catSlug: 'the-thao',
      imgSeed: 'police2',
    },
    {
      title: 'Chính phủ công bố gói hỗ trợ doanh nghiệp nhỏ và vừa',
      catSlug: 'kinh-te',
      imgSeed: 'summit',
    },
    {
      title: 'Thế hệ cầu thủ trẻ Việt Nam sẵn sàng cho các giải đấu châu lục',
      catSlug: 'the-thao',
      imgSeed: 'food',
    },
    {
      title: 'Hội nghị Thượng đỉnh G20 tập trung thảo luận về an ninh lương thực',
      catSlug: 'quoc-te',
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
      context: {
        skipRevalidation: true,
      },
    })
    createdGridPosts.push(Number(post.id))
  }
  console.log('Đang tạo dữ liệu tin mới nhất và treding...')

  const terkiniAndTrendingItems = [
    {
      title: 'Trào lưu "Flex" thành tích học tập và sự nghiệp tiếp tục phủ sóng MXH',
      catSlug: 'giai-tri',
      imgSeed: 'police-car',
      isTrending: true,
    },
    {
      title: 'Ca khúc indie mới ra mắt bất ngờ leo thẳng lên Top 1 Trending YouTube',
      catSlug: 'giai-tri',
      imgSeed: 'sea-games',
      isTrending: true,
    },
    {
      title: 'Cơn sốt món ăn street food mới khiến giới trẻ xếp hàng dài chờ đợi',
      catSlug: 'giai-tri',
      imgSeed: 'meeting-signing',
      isTrending: true,
    },
    {
      title: 'Bộ phim truyền hình mới lên sóng gây bão thảo luận trên các diễn đàn',
      catSlug: 'giai-tri',
      imgSeed: 'press-conference',
      isTrending: true,
    },
    {
      title: 'Các startup công nghệ Việt Nam gây ấn tượng tại hội nghị quốc tế',
      catSlug: 'kinh-te',
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
      context: {
        skipRevalidation: true,
      },
    })
  }
  // --- TẠO BÀI DÙNG CHO DISYORKAN ---
  console.log('Đang tạo tin cho Phần đề xuất...')

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
      title: 'Trào lưu sáng tạo video bằng ứng dụng AI độc đáo thu hút hàng triệu lượt view',
      category: categoryMap['giai-tri'],
      featuredImage: mainDisyorkanImg,
      status: 'published',
      publishedAt: new Date().toISOString(),
      slug: makeSlug(
        'Trào lưu sáng tạo video bằng ứng dụng AI độc đáo thu hút hàng triệu lượt view',
      ),
      content: createDummyContent('Gugur janin...'),
    },
    draft: true,
    overrideAccess: true,
    context: {
      skipRevalidation: true,
    },
  })

  // 6 bài nhỏ
  const disyorkanItems = [
    { title: 'Lễ hội âm nhạc ngoài trời cháy vé chỉ sau vài phút mở bán', seed: 'acid1' },
    {
      title:
        'Sự xuất hiện của dàn nghệ sĩ tên tuổi khiến cộng đồng yêu âm nhạc đứng ngồi không yên.',
      seed: 'gengbob',
    },
    {
      title: 'Bộ ảnh thời trang phong cách Retro thập niên 90 gây sốt giới trẻ',
      seed: 'diplomat',
    },
    { title: 'Khám phá vẻ đẹp thiên nhiên và văn hóa Phú Thọ', seed: 'caraccident' },
    { title: 'Mẹo tối ưu hiệu năng cho ứng dụng Node.js', seed: 'acid2' },
    {
      title: 'Giá năng lượng thế giới hạ nhiệt sau đợt biến động mạnh',
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
        category: categoryMap['trong-nuoc'] || categoryMap['giai-tri'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdDisyorkanSubIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO RENCANA ---
  console.log('Đang tạo tin cho khối Rencana...')

  // 1. 2 Bài chính (Trái & Giữa)
  const rencanaFeaturedItems = [
    {
      title: 'Ngành du lịch toàn cầu phục hồi vượt mức trước đại dịch',
      seed: 'school-renovate',
    },
    {
      title: 'Thám hiểm không gian: Tàu vũ trụ quốc tế gửi về hình ảnh mới nhất từ Sao Hỏa',
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
        category: categoryMap['trong-nuoc'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdRencanaFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách bên phải
  const rencanaSideItems = [
    {
      title: 'Phim điện ảnh Việt cán mốc doanh thu trăm tỷ sau 1 tuần công chiếu',
      seed: 'court-marissa',
    },
    {
      title: 'Đêm đại nhạc hội quy tụ dàn sao V-Pop bùng nổ trước hàng ngàn khán giả',
      seed: 'parliament-news',
    },
    {
      title: 'Nghệ sĩ tên tuổi bất ngờ tái xuất với album nhạc Jazz ngẫu hứng',
      seed: 'police-investigation',
    },
    {
      title: 'Hội nghị thượng đỉnh ASEAN bàn về hợp tác kinh tế và an ninh khu vực',
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
        category: categoryMap['trong-nuoc'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdRencanaSideIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO SUKAN ---
  console.log('Đang tạo tin cho phần thể thao...')

  // 1. 2 Bài chính nổi bật
  const sukanFeaturedItems = [
    {
      title: 'Kế hoạch nâng cấp và hiện đại hóa hệ thống sân vận động quốc gia',
      seed: 'xabi-alonso',
    },
    {
      title: 'Giải đua xe Công thức 1 (F1): Chặng đua kịch tính dưới mưa',
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
        category: categoryMap['the-thao'] || categoryMap['trong-nuoc'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdSukanFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách bên phải
  const sukanSideItems = [
    {
      title: 'Đội tuyển bóng rổ Mỹ công bố đội hình tham dự giải vô địch thế giới',
      seed: 'sukan-parliament',
    },
    {
      title: 'Kỷ lục thế giới mới được thiết lập ở cự ly chạy 100m nam',
      seed: 'football-fans',
    },
    {
      title: 'Cầu thủ trẻ Việt Nam ghi bàn quyết định trong trận chung kết U23 Đông Nam Á',
      seed: 'badminton-women',
    },
    {
      title: 'Huyền thoại bóng đá châu Âu giải nghệ sau 20 năm thi đấu đỉnh cao',
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
        category: categoryMap['the-thao'] || categoryMap['trong-nuoc'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdSukanSideIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO DUNIA ---
  console.log('Đang tạo tin cho phần quốc tế...')

  // 1. 2 Bài chính nổi bật
  const duniaFeaturedItems = [
    {
      title: 'Xung đột Israel-Palestine leo thang, cộng đồng quốc tế kêu gọi kiềm chế',
      seed: 'israel-palestine',
    },
    {
      title: 'Thảm họa sạt lở đất tại Nepal khiến hàng trăm người mất tích',
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
        category: categoryMap['quoc-te'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdDuniaFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách bên phải
  const duniaSideItems = [
    {
      title: 'Indonesia hạ lãi suất cơ bản lần đầu tiên trong 3 năm',
      seed: 'indonesia-money',
    },
    {
      title: 'Hàng nghìn người hành hương tụ tập tại Mecca trong mùa lễ hội Haji',
      seed: 'mecca-saudi',
    },
    {
      title: 'Cảnh sát Mỹ điều tra vụ xả súng tại trường học ở Texas',
      seed: 'us-police',
    },
    {
      title: 'Căng thẳng chính trị tại Sulawesi, Indonesia dẫn đến nhiều vụ bắt giữ',
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
        category: categoryMap['quoc-te'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdDuniaSideIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO BISNES ---
  console.log('Đang tạo tin cho phần kinh tế...')

  // 1. 2 Bài nổi bật phía trên
  const bisnesFeaturedItems = [
    {
      title: 'Kinh tế số hóa: Doanh nghiệp Việt Nam đẩy mạnh chuyển đổi số để tăng trưởng bền vững',
      seed: 'kwasaland-property',
    },
    {
      title: 'Startup công nghệ Việt Nam gây ấn tượng tại hội nghị quốc tế',
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
        category: categoryMap['kinh-te'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdBisnesFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách phía dưới (Grid 2x2)
  const bisnesSubItems = [
    {
      title: 'Doanh nghiệp khởi nghiệp Việt Nam nhận đầu tư quốc tế, mở rộng thị trường',
      seed: 'business-ceo-1',
    },
    {
      title: 'Tăng trưởng kinh tế Việt Nam dự báo đạt mức cao trong năm 2026',
      seed: 'business-man-2',
    },
    {
      title: 'Lĩnh vực công nghệ tài chính (Fintech) tại Việt Nam thu hút nhiều nhà đầu tư',
      seed: 'corporate-signing',
    },
    {
      title: 'Xu hướng tiêu dùng bền vững và thân thiện môi trường ngày càng phổ biến tại Việt Nam',
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
        category: categoryMap['kinh-te'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdBisnesSubIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO HIBURAN ---
  console.log('Đang tạo tin cho phần giải trí...')

  // 1. 2 Bài nổi bật phía trên
  const hiburanFeaturedItems = [
    {
      title: 'Ca sĩ nổi tiếng ra mắt album mới, hứa hẹn gây bão thị trường âm nhạc',
      seed: 'singing-duo',
    },
    {
      title: 'Chuyến du lịch mạo hiểm tại vùng núi cao thu hút giới trẻ yêu khám phá',
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
        category: categoryMap['giai-tri'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdHiburanFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách phía dưới (Grid 2x2)
  const hiburanSubItems = [
    {
      title: 'Concert âm nhạc ngoài trời thu hút hàng nghìn khán giả',
      seed: 'stage-concert',
    },
    {
      title: 'Diễn viên nổi tiếng tham gia sự kiện thời trang quốc tế, gây chú ý truyền thông',
      seed: 'actor-suit',
    },
    {
      title: 'Lễ kỉ niệm 10 năm thành lập nhóm nhạc đình đám, fan hâm mộ háo hức chờ đón',
      seed: 'celebrity-family',
    },
    {
      title: 'Cặp đôi nổi tiếng công bố dự án hợp tác mới, gây tò mò dư luận',
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
        category: categoryMap['giai-tri'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdHiburanSubIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO GAYA HIDUP ---
  console.log('Đang tạo tin cho phần Phong cách sống...')

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
      title: 'Phong cách sống hiện đại: Xu hướng chăm sóc sức khỏe và làm đẹp tự nhiên',
      category: categoryMap['phong-cach-song'],
      featuredImage: gayaHidupMainImg,
      status: 'published',
      publishedAt: new Date().toISOString(),
      slug: makeSlug('Phong cách sống hiện đại: Xu hướng chăm sóc sức khỏe và làm đẹp tự nhiên'),
      content: createDummyContent(
        'Phong cách sống hiện đại: Xu hướng chăm sóc sức khỏe và làm đẹp tự nhiên...',
      ),
    },
    draft: true,
    overrideAccess: true,
    context: {
      skipRevalidation: true,
    },
  })

  // 2. 4 Bài danh sách phía dưới
  const gayaHidupSubItems = [
    {
      title: 'Khám phá khu nghỉ dưỡng sang trọng tại Bali, Indonesia',
      seed: 'lexis-resort',
    },
    {
      title: 'Món hàu Merbok nổi tiếng với hương vị đặc trưng và giàu dinh dưỡng',
      seed: 'merbok-oyster',
    },
    {
      title: 'Trẻ em uống sữa đúng cách để phát triển toàn diện',
      seed: 'child-drinking-milk',
    },
    {
      title: '5 cách chăm sóc người cao tuổi tại nhà hiệu quả và an toàn',
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
        category: categoryMap['phong-cach-song'] || categoryMap['nasional'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdGayaHidupSubIds.push(Number(post.id))
  }
  // --- TẠO BÀI DÙNG CHO BH PLUS ---
  console.log('Đang tạo tin cho khối BH Plus...')

  // 1. 2 Bài nổi bật phía trên
  const bhPlusFeaturedItems = [
    {
      title: '2 ca sĩ nổi tiếng hợp tác ra mắt ca khúc mới, hứa hẹn gây bão thị trường âm nhạc',
      seed: 'singers-duo',
    },
    {
      title: 'Cuộc đua xe đạp quốc tế tại Madinah thu hút hàng nghìn vận động viên và khán giả',
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
        category: categoryMap['trong-nuoc'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdBhPlusFeaturedIds.push(Number(post.id))
  }

  // 2. 4 Bài danh sách phía dưới (Grid 2x2)
  const bhPlusSubItems = [
    {
      title: 'Socola Gusmao ra mắt dòng sản phẩm mới',
      seed: 'gusmao-chocolate',
    },
    {
      title: 'ASEAN United: Hợp tác kinh tế và văn hóa giữa các quốc gia Đông Nam Á',
      seed: 'asean-united',
    },
    {
      title: 'Kinh nghiệm huấn luyện thể thao từ các huấn luyện viên hàng đầu thế giới',
      seed: 'coach-experiment',
    },
    {
      title: 'Báo cáo giáo dục: Xu hướng học tập trực tuyến và tác động đến sinh viên',
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
        category: categoryMap['trong-nuoc'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
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
  console.log('Đang tạo dữ liệu cho phần bộ sưu tập ảnh...')

  // Tạo mảng gồm 32 ảnh ngẫu nhiên tượng trưng cho grid ảnh phong phú
  const galleryItems = []
  for (let i = 1; i <= 32; i++) {
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/galeri-photo-${i}/400/300`,
      `galeri-photo-${i}.jpg`,
      `Foto Galeri ${i}`,
    )
    if (imgId) {
      galleryItems.push({
        image: imgId,
        caption: `Gambar galeri ${i}`,
      })
    }
  }
  // --- TẠO DỮ LIỆU CHO KHỐI PODCAST ---
  console.log('Đang tạo tin cho phần Podcast...')

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
      title: 'Hình ảnh và câu chuyện đằng sau những bức ảnh nổi tiếng trên mạng xã hội - John Doe',
      seed: 'podcast-guest-1',
    },
    {
      title: 'Công nghệ AI và tác động của nó đến cuộc sống hàng ngày - Jane Smith',
      seed: 'podcast-guest-2',
    },
    {
      title: 'Khám phá thế giới ẩm thực đường phố và những món ăn độc đáo - Chef Alex',
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
        category: categoryMap['trong-nuoc'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdPodcastIds.push(Number(post.id))
  }
  // --- TẠO DỮ LIỆU CHO KHỐI BH TV ---
  console.log('Đang tạo tin cho khối BH TV...')

  // 1. Tạo/Lấy logo BH TV
  const bhTvLogoImg = await createMediaFromUrl(
    payload,
    'https://picsum.photos/seed/bhtv-badge-logo/100/100',
    'bhtv-logo.jpg',
    'BH TV Logo',
  )

  // 2. Video nổi bật chính (Bên trái)
  const mainVideoImg = await createMediaFromUrl(
    payload,
    'https://picsum.photos/seed/melaka-court/800/450',
    'bhtv-main-video.jpg',
    'Melaka Court Escort Video',
  )

  const createdMainVideo = await payload.create({
    collection: 'posts',
    data: {
      title:
        'Video chi tiết về vụ án: Hại đồng nghiệp bằng thuốc mua trên TikTok, nhân viên quán cà phê bị kết án 9 tháng tù',
      category: categoryMap['trong-nuoc'],
      featuredImage: mainVideoImg,
      status: 'published',
      publishedAt: new Date().toISOString(),
      slug: makeSlug(
        'Hại đồng nghiệp bằng thuốc mua trên TikTok, nhân viên quán cà phê bị kết án 9 tháng tù',
      ),
      content: createDummyContent('Video chi tiết vụ án...'),
    },
    draft: true,
    overrideAccess: true,
    context: {
      skipRevalidation: true,
    },
  })

  // 3. 6 Video nhỏ bên phải
  const bhTvSubItems = [
    {
      title: 'Vụ sạt lở tại Madinah: Cảnh sát và lực lượng cứu hộ nỗ lực tìm kiếm nạn nhân',
      seed: 'police-arrest-1',
    },
    {
      title:
        'Lũ lụt tại Jakarta: Hàng nghìn người phải sơ tán, chính quyền địa phương kêu gọi hỗ trợ',
      seed: 'police-conference-2',
    },
    {
      title:
        "Phỏng vấn nhân chứng vụ tai nạn giao thông nghiêm trọng tại Kuala Lumpur: 'Tôi không kịp phản ứng, mọi thứ diễn ra quá nhanh'",
      seed: 'accident-witness-3',
    },
    {
      title:
        'Mẫu xe mới nhất ra mắt tại triển lãm ô tô quốc tế, thu hút sự chú ý của giới truyền thông và người hâm mộ',
      seed: 'car-accident-4',
    },
    {
      title: 'Cảnh sát điều tra vụ án mạng tại Penang: Nghi phạm bị bắt giữ sau 48 giờ truy tìm',
      seed: 'suspect-face-5',
    },
    {
      title: 'Những hình ảnh ấn tượng từ buổi lễ trao giải thưởng điện ảnh quốc tế tại Singapore',
      seed: 'court-escort-6',
    },
  ]

  const createdSubVideoIds: number[] = []
  for (let i = 0; i < bhTvSubItems.length; i++) {
    const item = bhTvSubItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/400/250`,
      `bhtv-sub-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['giai-tri'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdSubVideoIds.push(Number(post.id))
  }
  // --- TẠO DỮ LIỆU CHO KHỐI VIDEO TERKINI ---
  console.log('Đang tạo tin cho khối Video Terkini...')

  // 1. Logo BH TV góc trên phải
  const videoTerkiniLogoImg = await createMediaFromUrl(
    payload,
    'https://picsum.photos/seed/bhtv-top-right-logo/100/100',
    'bhtv-top-logo.jpg',
    'BH TV Top Right Logo',
  )

  // 2. Danh sách 5 video ngắn
  const videoTerkiniItems = [
    {
      title: 'Video: Rừng bốc cháy dữ dội, lính cứu hỏa nỗ lực dập lửa',
      duration: '1:10',
      seed: 'tanker-explosion-1',
    },
    {
      title: 'Video: Cảnh sát điều tra vụ án mạng tại Cairo, Ai Cập',
      duration: '1:10',
      seed: 'egypt-news-2',
    },
    {
      title: 'Video: Trẻ em không kịp nhận liều vắc xin polio thứ hai, tử vong do nhiễm bệnh',
      duration: '1:10',
      seed: 'rubble-child-3',
    },
    {
      title: 'Video: Cháy nổ tại nhà máy hóa chất, lính cứu hỏa nỗ lực dập lửa',
      duration: '1:10',
      seed: 'fire-explosion-4',
    },
    {
      title: 'Video: Căng thẳng chính trị tại Tehran, Iran, biểu tình phản đối chính phủ',
      duration: '1:10',
      seed: 'iran-official-5',
    },
    {
      title: 'Video: Tình hình chiến sự tại Tehran, Iran',
      duration: '1:10',
      seed: 'iran-official-6',
    },
  ]

  const createdVideoTerkiniIds: number[] = []
  for (let i = 0; i < videoTerkiniItems.length; i++) {
    const item = videoTerkiniItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/450/800`, // Ảnh dạng dọc 9:16
      `video-terkini-${i}.jpg`,
      item.title,
    )
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['quoc-te'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },

      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })
    createdVideoTerkiniIds.push(Number(post.id))
  }
  // --- TẠO DỮ LIỆU CHO KHỐI SIHAT ---
  console.log('Đang tạo tin cho khối Sihat...')

  const sihatItems = [
    {
      title:
        'Cảnh báo sức khỏe: Tác hại của việc sử dụng điện thoại quá nhiều đối với mắt và não bộ',
      seed: 'sihat-featured-1',
      isMain: true,
    },
    {
      title: 'Món ăn truyền thống giúp tăng cường hệ miễn dịch và sức khỏe tim mạch',
      seed: 'sihat-sub-1',
    },
    {
      title:
        'Khám phá các bài tập thể dục đơn giản tại nhà giúp giảm căng thẳng và cải thiện tinh thần',
      seed: 'sihat-sub-2',
    },
    {
      title: 'Dịch cúm mùa đông: Cách phòng ngừa và chăm sóc sức khỏe cho cả gia đình',
      seed: 'sihat-sub-3',
    },
    {
      title: 'Rủi ro sức khỏe khi sử dụng mạng xã hội quá mức',
      seed: 'sihat-sub-4',
    },
  ]

  let sihatMainId: number | null = null
  const createdSihatSubIds: number[] = []

  for (let i = 0; i < sihatItems.length; i++) {
    const item = sihatItems[i]
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.seed}/800/500`,
      `sihat-${i}.jpg`,
      item.title,
    )

    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryMap['suc-khoe'],
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: true,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })

    if (item.isMain) {
      sihatMainId = Number(post.id)
    } else {
      createdSihatSubIds.push(Number(post.id))
    }
  }

  // --- Chuẩn bị danh sách Trending Keywords---
  console.log('Chuẩn bị danh sách Trending Keywords...')
  const trendingKeywords = ['Giá xăng', 'scandal', 'Cúm A', 'Lũ lụt', 'Gió mùa đông bắc']

  const processedTrending = trendingKeywords.map((keyword, index) => ({
    keyword,
    order: index + 1,
  }))

  console.log('Đang liên kết dữ liệu vào Global HomePage...')

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      video_popup_widget: {
        thumbnail: bhTvLogoImg,
      },
      utamaSection: {
        title: 'Nổi bật',
        featuredMain: mainPost.id,
        featuredSide: createdSidePosts,
        featuredBullet: [bullet1.id, bullet2.id, bullet3.id],
        gridPosts: createdGridPosts,
        terkiniLimit: 5,
        trendingLimit: 5,
      },
      disyorkanSection: {
        title: 'Đề xuất',
        mainPost: disyorkanMain.id,
        subPosts: createdDisyorkanSubIds,
      },
      rencanaSection: {
        title: 'Gần đây',
        featuredPosts: createdRencanaFeaturedIds,
        sidePosts: createdRencanaSideIds,
      },
      sukanSection: {
        title: 'Thể thao',
        featuredPosts: createdSukanFeaturedIds,
        sidePosts: createdSukanSideIds,
      },
      duniaSection: {
        title: 'Quốc tế',
        featuredPosts: createdDuniaFeaturedIds,
        sidePosts: createdDuniaSideIds,
      },
      bisnesSection: {
        title: 'Kinh tế',
        featuredPosts: createdBisnesFeaturedIds,
        subPosts: createdBisnesSubIds,
      },
      hiburanSection: {
        title: 'Giải trí',
        featuredPosts: createdHiburanFeaturedIds,
        subPosts: createdHiburanSubIds,
      },
      gayaHidupSection: {
        title: 'Phong cách sống',
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
        title: 'Bộ sưu tập ảnh',
        galleryImages: galleryItems,
      },
      podcastSection: {
        title: 'Podcast',
        channelLogo: podcastLogoImg,
        videos: createdPodcastIds,
      },
      bhTvSection: {
        title: 'BH TV',
        channelLogo: bhTvLogoImg,
        mainVideo: createdMainVideo.id,
        subVideos: createdSubVideoIds,
      },
      videoTerkiniSection: {
        title: 'Video mới nhất',
        channelLogo: videoTerkiniLogoImg,
        videos: createdVideoTerkiniIds,
      },
      sihatSection: {
        title: 'Sức khoẻ',
        featuredPost: sihatMainId,
        subPosts: createdSihatSubIds,
      },

      trending_in_top: processedTrending,
    },
  })
  console.log('Khởi tạo toàn bộ dữ liệu Posts thành công!')
}
export async function seedFooter(payload: Payload, logoId: any) {
  console.log('Khởi tạo toàn bộ dữ liệu footer!')
  payload.logger.info('— Seeding Footer...')

  // 2. Cập nhật dữ liệu cho Global 'footer'
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      ...(logoId ? { logo: logoId } : {}),
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'twitter', url: 'https://x.com' },
        { platform: 'whatsapp', url: 'https://whatsapp.com' },
        { platform: 'youtube', url: 'https://youtube.com' },
        { platform: 'tiktok', url: 'https://tiktok.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
      ],
      appStoreLinks: {
        appStoreUrl: 'https://apple.com/app-store',
        googlePlayUrl: 'https://play.google.com',
      },
      columns: [
        {
          title: '',
          links: [
            { label: 'Tin tức', url: '/tin-tuc' },
            { label: 'BHPLUS', url: '/bhplus' },
            { label: 'Tin trong nước', url: '/trong-nuoc' },
            { label: 'Tin kinh tế', url: '/kinh-te' },
          ],
        },
        {
          title: '',
          links: [
            { label: 'Thể thao', url: '/the-thao' },
            { label: 'Quốc tế', url: '/quoc-te' },
            { label: 'Giải trí', url: '/giai-tri' },
            { label: 'Kinh tế', url: '/kinh-te' },
          ],
        },
        {
          title: '',
          links: [
            { label: 'Multimedia', url: '/multimedia' },
            { label: 'Foto', url: '/foto' },
            { label: 'BHTV', url: '/bhtv' },
          ],
        },
      ],
      copyrightText: '2026 ©. All rights reserved.',
      bottomLinks: [
        { label: 'abc', url: '/abc' },
        { label: 'def', url: '/def' },
        { label: 'Chính sách bảo mật', url: '/privacy-policy' },
      ],
    },
  })

  payload.logger.info('Footer seeded successfully!')

  console.log('Khởi tạo toàn bộ dữ liệu footer thành công!')
}

export async function seedHeader(payload: Payload, logoId: any) {
  console.log('Đang cập nhật dữ liệu Header Global...')

  // 2. Danh sách dữ liệu mẫu cho Slider
  const slidersData = [
    {
      title: "Ca khúc top trending: 'Hành trình âm nhạc của nhóm",
      categorySlug: 'giai-tri',
      imgSeed: 'stacy-sabah',
    },
    {
      title: 'Doanh số bán hàng trực tuyến tăng mạnh trong quý 2, đạt mức kỷ lục',
      categorySlug: 'kinh-te',
      imgSeed: 'laptop-phone',
    },
    {
      title: 'Đội tuyển chiến thắng giải AFC Cup 2024',
      categorySlug: 'the-thao',
      imgSeed: 'khelif-boxer',
    },
    {
      title: 'Cuộc xung đột tại Gaza: Tình hình căng thẳng leo thang và những diễn biến mới nhất',
      categorySlug: 'quoc-te',
      imgSeed: 'gaza-war',
    },
  ]

  const createdPostIds: number[] = []

  // 3. Tạo các bài viết Posts và lưu danh sách ID
  for (let i = 0; i < slidersData.length; i++) {
    const item = slidersData[i]

    console.log(`Đang tạo bài viết Slider ${i + 1}: ${item.title}`)

    // 3.1. Upload media
    const imgId = await createMediaFromUrl(
      payload,
      `https://picsum.photos/seed/${item.imgSeed}/1200/600`,
      `header-slider-${i}.jpg`,
      item.title,
    )

    if (imgId === null) {
      console.error(`Không thể tạo image cho slider: ${item.title}`)
      continue
    }

    // 3.2. Tìm categoryId tương ứng, fallback về category mặc định nếu không tìm thấy
    const categoryId = categoryMap[item.categorySlug] || Object.values(categoryMap)[0]

    // 3.3. Tạo bài viết Post trong Payload
    const post = await payload.create({
      collection: 'posts',
      data: {
        title: item.title,
        category: categoryId,
        featuredImage: imgId,
        status: 'published',
        publishedAt: new Date().toISOString(),
        slug: makeSlug(item.title),
        content: createDummyContent(item.title),
      },
      draft: false,
      overrideAccess: true,
      context: {
        skipRevalidation: true,
      },
    })

    createdPostIds.push(Number(post.id))
  }
  const fallbackHtml = `
<a href="/" class="flex items-center gap-3 group">
  <div class="w-12 h-12 bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-400 dark:border-gray-600 rounded flex flex-col items-center justify-center text-gray-400 group-hover:border-red-600 transition-colors">
    
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <circle cx="9" cy="9" r="2"/>
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>

    <span class="text-[9px] font-mono leading-none mt-1">
      LOGO
    </span>
  </div>

  <div class="flex flex-col">
    <div class="flex items-center gap-2">
      <span class="font-sans font-black text-xl md:text-2xl uppercase tracking-tight text-[#D81B50]">
        MEDIA
      </span>
    </div>

    <p class="text-xs font-bold text-gray-600 mt-0.5">
      Trang báo top 2 cả nước
    </p>
  </div>
</a>
`
  // 4. Update Global Header bằng mảng bài viết (Relationship)
  // Lưu ý: Phụ thuộc vào cách bạn khai báo field `sliders` trong Header Global Config:

  await payload.updateGlobal({
    slug: 'header',
    data: {
      sliders: createdPostIds,
      logo: logoId,
      fallback_html: fallbackHtml,
    },
    overrideAccess: true,
    context: {
      skipRevalidation: true,
    },
  })

  console.log('Cập nhật dữ liệu Header Global thành công!')
}
export async function seedAdsConfig(payload: Payload) {
  console.log('Đang cập nhật dữ liệu Ads Config Global...')

  await payload.updateGlobal({
    slug: 'ads-config',
    data: {
      // TAB 1: DESKTOP
      BH_Web_Billboard_Homepage_970x250: {
        active: true,
        imageUrl: 'https://placehold.co/970x250/2563eb/ffffff?text=DESKTOP+BILLBOARD+970x250',
        link: 'https://example.com',
      },
      BH_300x250: {
        active: true,
        imageUrl: 'https://placehold.co/300x250/dc2626/ffffff?text=DESKTOP+300x250+A',
        link: 'https://example.com',
      },
      BH_300x250_b: {
        active: true,
        imageUrl: 'https://placehold.co/300x250/16a34a/ffffff?text=DESKTOP+300x250+B',
        link: 'https://example.com',
      },

      // TAB 2: MOBILE
      BH_320x50: {
        active: true,
        imageUrl: 'https://placehold.co/320x50/d97706/ffffff?text=MOBILE+320x50',
        link: 'https://example.com',
      },
      BH_300x250_Mobile: {
        active: true,
        imageUrl: 'https://placehold.co/300x250/9333ea/ffffff?text=MOBILE+300x250',
        link: 'https://example.com',
      },
      BH_HP_Sticky_Leaderboard: {
        active: true,
        imageUrl: 'https://placehold.co/320x50/0891b2/ffffff?text=STICKY+LEADERBOARD',
        link: 'https://example.com',
      },
      BH_Mobile_Banner: {
        active: true,
        imageUrl: 'https://placehold.co/320x100/4f46e5/ffffff?text=MOBILE+BANNER+A',
        link: 'https://example.com',
      },
      BH_Mobile_Banner_b: {
        active: true,
        imageUrl: 'https://placehold.co/320x100/ca8a04/ffffff?text=MOBILE+BANNER+B',
        link: 'https://example.com',
      },
      BH_Multisize_HouseAds: {
        active: true,
        imageUrl: 'https://placehold.co/970x90/0d9488/ffffff?text=MULTISIZE+HOUSE+ADS',
        link: 'https://example.com',
      },
    },
    overrideAccess: true,
    context: {
      skipRevalidation: true,
    },
  })

  console.log('Cập nhật dữ liệu Ads Config Global thành công!')
}

const categoryMap: Record<string, number> = {}
async function main() {
  console.log('PAYLOAD_SECRET exists:', !!process.env.PAYLOAD_SECRET)
  const payload = await getPayload({
    config: configPromise,
  })

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
        draft: true,
        overrideAccess: true,
        context: {
          skipRevalidation: true,
        },
      })
      categoryMap[cat.slug] = Number(createdCat.id)
    }
  }

  const logoUrl = 'https://picsum.photos/200/80'
  const logoId = await createMediaFromUrl(payload, logoUrl, 'bh-online-logo.jpg', 'BH Online Logo')

  console.log('Starting seed')
  await seedPosts(payload)
  await seedHeader(payload, logoId)
  await seedFooter(payload, logoId)
  seedAdsConfig(payload)
  console.log('Seed completed')
}

main().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
