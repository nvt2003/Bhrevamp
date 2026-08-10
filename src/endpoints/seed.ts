import { Payload } from 'payload'

type SliderSeed = {
  title: string
  category: string
  slug: string
  order: number
  imageUrl: string
  imageName: string
}

export const seedSliders = async (payload: Payload) => {
  // 1. Kiểm tra slider đã tồn tại chưa
  const existingSliders = await payload.find({
    collection: 'sliders',
    limit: 1,
  })

  if (existingSliders.totalDocs > 0) {
    console.log('Dữ liệu Sliders đã tồn tại, bỏ qua Seed.')
    return
  }

  console.log('Đang tạo dữ liệu mẫu cho Sliders...')

  // 2. Danh sách slider mẫu
  const sampleSliders: SliderSeed[] = [
    {
      title: "Stacy 'terbang' di Sabah",
      category: 'Hiburan',
      slug: 'stacy-terbang-di-sabah',
      order: 1,
      imageUrl: 'https://picsum.photos/seed/stacy/1200/600',
      imageName: 'stacy.jpg',
    },
    {
      title: 'Komputer riba serba pintar permudah sambungan iPhone, Windows',
      category: 'Bisnes',
      slug: 'komputer-riba-serba-pintar',
      order: 2,
      imageUrl: 'https://picsum.photos/seed/computer/1200/600',
      imageName: 'computer.jpg',
    },
    {
      title: 'Khelif perlu pulangkan pingat - Kremlev',
      category: 'Sukan',
      slug: 'khelif-perlu-pulangkan-pingat',
      order: 3,
      imageUrl: 'https://picsum.photos/seed/sports/1200/600',
      imageName: 'sports.jpg',
    },
    {
      title: 'Perang Israel-Iran tidak mengubah nasib Gaza',
      category: 'Nasional',
      slug: 'perang-israel-iran',
      order: 4,
      imageUrl: 'https://picsum.photos/seed/world/1200/600',
      imageName: 'world.jpg',
    },
    {
      title: 'Cập nhật diễn biến kinh tế thế giới mới nhất hôm nay',
      category: 'Thế Giới',
      slug: 'dien-bien-kinh-te',
      order: 5,
      imageUrl: 'https://picsum.photos/seed/economy/1200/600',
      imageName: 'economy.jpg',
    },
  ]

  // 3. Tạo từng slider
  for (const slider of sampleSliders) {
    console.log(`Đang tạo ảnh cho: ${slider.title}`)

    // Tải ảnh từ URL
    const response = await fetch(slider.imageUrl)

    if (!response.ok) {
      console.error(`Không thể tải ảnh: ${slider.imageUrl}`)
      continue
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 4. Tạo Media
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: slider.title,
      },
      file: {
        data: buffer,
        mimetype: response.headers.get('content-type') || 'image/jpeg',
        name: slider.imageName,
        size: buffer.length,
      },
    })

    console.log(`Media created: ${media.id}`)

    // 5. Tạo Slider và liên kết với Media
    await payload.create({
      collection: 'sliders',
      data: {
        title: slider.title,
        category: slider.category,
        slug: slider.slug,
        image: media.id,
        order: slider.order,
      },
      overrideAccess: true,
    })

    console.log(`Slider created: ${slider.title}`)
  }

  console.log('Đã khởi tạo thành công 5 sliders mẫu!')
}
