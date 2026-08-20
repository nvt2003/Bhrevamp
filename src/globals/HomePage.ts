import type { GlobalConfig } from 'payload'
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Homepage',
  access: { read: () => true },
  fields: [
    //Danh sách Trending Keywords
    {
      name: 'trending_in_top',
      type: 'array',
      label: 'Trending Keywords',
      labels: {
        singular: 'Keyword',
        plural: 'Keywords',
      },
      fields: [
        {
          name: 'keyword',
          type: 'text',
          label: 'Từ khóa',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          label: 'Thứ tự',
          defaultValue: 0,
        },
      ],
    },
    // ================= CẤU HÌNH POPUP VIDEO FLOATING =================
    {
      name: 'video_popup_widget',
      type: 'group',
      label: 'Popup Video Floating Settings',
      fields: [
        {
          name: 'enable',
          type: 'checkbox',
          label: 'Display Popup Video',
          defaultValue: true,
        },
        {
          name: 'video_url',
          type: 'text',
          label: 'Url Video (YouTube, Vimeo, MP4 direct link...)',
          admin: {
            placeholder: 'https://www.youtube.com/watch?v=...',
            description: 'Use url from youTube and others web allow display video with link',
            condition: (_, siblingData) => Boolean(siblingData?.enable),
          },
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail / Poster (no required)',
          admin: {
            description: 'Display if video url is invalid',
            condition: (_, siblingData) => Boolean(siblingData?.enable),
          },
        },
      ],
    },

    // -------------------------------------------------------------
    // KHỐI 1: UTAMA + SIDEBAR (TERKINI & TRENDING)
    // -------------------------------------------------------------
    {
      name: 'utamaSection',
      type: 'group',
      label: 'Khối Utama & Sidebar Top',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Utama',
        },
        {
          name: 'featuredMain',
          type: 'relationship',
          relationTo: 'posts',
          label: 'Bài chính (Main Featured)',
        },
        {
          name: 'featuredSide',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 4,
          label: '4 Bài ảnh bên trái',
        },
        {
          name: 'featuredBullet',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          label: 'Các bài danh sách gạch đầu dòng (Bullets)',
        },
        {
          name: 'gridPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          label: 'Bài dạng Grid bên dưới Utama',
        },
        // Sidebar Config
        {
          name: 'terkiniLimit',
          type: 'number',
          defaultValue: 5,
          label: 'Số lượng bài Terkini (Cột phải - có ảnh)',
        },
        {
          name: 'trendingLimit',
          type: 'number',
          defaultValue: 5,
          label: 'Số lượng bài Trending (Cột phải - dạng list)',
        },
      ],
    },

    // -------------------------------------------------------------
    // KHỐI 2: DISYORKAN (1 BÀI TO + 6 BÀI NHỎ)
    // -------------------------------------------------------------
    {
      name: 'disyorkanSection',
      type: 'group',
      label: 'Khối Disyorkan (Đề xuất)',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Disyorkan',
        },
        {
          name: 'mainPost',
          type: 'relationship',
          relationTo: 'posts',
          label: '1 Bài lớn (Bên trái)',
        },
        {
          name: 'subPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 6,
          label: '6 Bài nhỏ (Bên phải)',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: RENCANA (2 BÀI LỚN BÊN TRÁI + 4 BÀI DỌC BÊN PHẢI)
    // -------------------------------------------------------------
    {
      name: 'rencanaSection',
      type: 'group',
      label: 'Khối Rencana',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Rencana',
        },
        {
          name: 'featuredPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 2,
          label: '2 Bài nổi bật chính (Cột trái & giữa)',
        },
        {
          name: 'sidePosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 4,
          label: '4 Bài danh sách dọc (Cột phải - có thumbnail nhỏ)',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: SUKAN (2 BÀI LỚN BÊN TRÁI + 4 BÀI DỌC BÊN PHẢI)
    // -------------------------------------------------------------
    {
      name: 'sukanSection',
      type: 'group',
      label: 'Khối Sukan',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Sukan',
        },
        {
          name: 'featuredPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 2,
          label: '2 Bài nổi bật chính (Bên trái & Giữa)',
        },
        {
          name: 'sidePosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 4,
          label: '4 Bài danh sách dọc (Bên phải - có thumbnail)',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: DUNIA (2 BÀI LỚN BÊN TRÁI + 4 BÀI DỌC BÊN PHẢI)
    // -------------------------------------------------------------
    {
      name: 'duniaSection',
      type: 'group',
      label: 'Khối Dunia',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Dunia',
        },
        {
          name: 'featuredPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 2,
          label: '2 Bài nổi bật chính (Cột trái & Giữa)',
        },
        {
          name: 'sidePosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 4,
          label: '4 Bài danh sách dọc (Cột phải - có thumbnail)',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: BISNES (2 BÀI LỚN PHÍA TRÊN + 4 BÀI NHỎ 2x2 PHÍA DƯỚI)
    // -------------------------------------------------------------
    {
      name: 'bisnesSection',
      type: 'group',
      label: 'Khối Bisnes',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Bisnes',
        },
        {
          name: 'featuredPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 2,
          label: '2 Bài nổi bật chính (Hàng trên)',
        },
        {
          name: 'subPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 4,
          label: '4 Bài danh sách nhỏ (Hàng dưới - Grid 2x2)',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: HIBURAN (2 BÀI LỚN PHÍA TRÊN + 4 BÀI NHỎ 2x2 PHÍA DƯỚI)
    // -------------------------------------------------------------
    {
      name: 'hiburanSection',
      type: 'group',
      label: 'Khối Hiburan',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Hiburan',
        },
        {
          name: 'featuredPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 2,
          label: '2 Bài nổi bật chính (Hàng trên)',
        },
        {
          name: 'subPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 4,
          label: '4 Bài danh sách nhỏ (Hàng dưới - Grid 2x2)',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: GAYA HIDUP (1 BÀI LỚN PHÍA TRÊN + 4 BÀI DỌC PHÍA DƯỚI)
    // -------------------------------------------------------------
    {
      name: 'gayaHidupSection',
      type: 'group',
      label: 'Khối Gaya Hidup',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Gaya Hidup',
        },
        {
          name: 'featuredPost',
          type: 'relationship',
          relationTo: 'posts',
          label: 'Bài nổi bật chính (Ảnh lớn phía trên)',
        },
        {
          name: 'subPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 4,
          label: '4 Bài danh sách nhỏ (Xếp dọc phía dưới)',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: BH PLUS (2 BÀI LỚN PHÍA TRÊN + 4 BÀI NHỎ 2x2 PHÍA DƯỚI)
    // -------------------------------------------------------------
    {
      name: 'bhPlusSection',
      type: 'group',
      label: 'Khối BH Plus',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'BH Plus',
        },
        {
          name: 'featuredPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 2,
          label: '2 Bài nổi bật chính (Hàng trên)',
        },
        // -------------------------------------------------------------
        // KHỐI: INFOGRAFIK (HIỂN THỊ ẢNH INFOGRAPHIC DỌC)
        // -------------------------------------------------------------
        {
          name: 'infografikSection',
          type: 'group',
          label: 'Khối Infografik',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Infografik',
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Ảnh Infographic chính',
            },
            {
              name: 'linkUrl',
              type: 'text',
              label: 'Đường dẫn liên kết (khi click vào ảnh)',
              defaultValue: '/infografik',
            },
          ],
        },
        // -------------------------------------------------------------
        // KHỐI: GALERI FOTO (LƯỚI ẢNH TẬP TRUNG - GRID 4 CỘT)
        // -------------------------------------------------------------
        {
          name: 'galeriFotoSection',
          type: 'group',
          label: 'Khối Galeri Foto',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Galeri Foto',
            },
            {
              name: 'galleryImages',
              type: 'array',
              label: 'Danh sách ảnh thư viện',
              minRows: 4,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  label: 'Chú thích ảnh',
                },
              ],
            },
          ],
        },
        {
          name: 'subPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 4,
          label: '4 Bài danh sách nhỏ (Hàng dưới - Grid 2x2)',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: INFOGRAFIK (HIỂN THỊ ẢNH INFOGRAPHIC DỌC)
    // -------------------------------------------------------------
    {
      name: 'infografikSection',
      type: 'group',
      label: 'Khối Infografik',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Infografik',
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Ảnh Infographic chính',
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Đường dẫn liên kết (khi click vào ảnh)',
          defaultValue: '/infografik',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: GALERI FOTO (LƯỚI ẢNH TẬP TRUNG - GRID 4 CỘT)
    // -------------------------------------------------------------
    {
      name: 'galeriFotoSection',
      type: 'group',
      label: 'Khối Galeri Foto',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Galeri Foto',
        },
        {
          name: 'galleryImages',
          type: 'array',
          label: 'Danh sách ảnh thư viện',
          minRows: 4,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
              label: 'Chú thích ảnh',
            },
          ],
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: PODCAST (DANH SÁCH VIDEO DỌC CÓ PLAY ICON & BADGE LOGO)
    // -------------------------------------------------------------
    {
      name: 'podcastSection',
      type: 'group',
      label: 'Khối Podcast',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Podcast',
        },
        {
          name: 'channelLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo kênh (BH TV)',
        },
        {
          name: 'videos',
          type: 'relationship',
          relationTo: 'posts', // hoặc collection 'videos' tùy thuộc vào dự án của bạn
          hasMany: true,
          maxRows: 3,
          label: 'Danh sách 3 video podcast',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: BH TV (1 VIDEO LỚN BÊN TRÁI + 6 VIDEO NHỎ LƯỚI 3x2 BÊN PHẢI)
    // -------------------------------------------------------------
    {
      name: 'bhTvSection',
      type: 'group',
      label: 'Khối BH TV',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'BH TV',
        },
        {
          name: 'channelLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo kênh BH TV',
        },
        {
          name: 'mainVideo',
          type: 'relationship',
          relationTo: 'posts',
          label: 'Video chính nổi bật (Bên trái)',
        },
        {
          name: 'subVideos',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 6,
          label: '6 Video danh sách nhỏ (Lưới 3 cột x 2 hàng bên phải)',
        },
      ],
    },
    // -------------------------------------------------------------
    // KHỐI: VIDEO TERKINI (CAROUSEL VIDEO DẠNG KHUNG DỌC SHORTS 9:16)
    // -------------------------------------------------------------
    {
      name: 'videoTerkiniSection',
      type: 'group',
      label: 'Khối Video Terkini',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Video Terkini',
        },
        {
          name: 'channelLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo kênh BH TV (Góc trên bên phải)',
        },
        {
          name: 'videos',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          label: 'Danh sách các Video ngắn (Tỷ lệ 9:16)',
        },
      ],
    },
    // ==========================================
    // SIHAT SECTION
    // ==========================================
    {
      name: 'sihatSection',
      type: 'group',
      label: 'Sihat',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề Section',
          defaultValue: 'Sihat',
          required: true,
        },
        {
          name: 'moreText',
          type: 'text',
          label: 'Text nút Xem thêm',
          defaultValue: 'Lagi Sihat',
        },
        {
          name: 'moreLink',
          type: 'text',
          label: 'Đường dẫn Xem thêm',
          defaultValue: '/sihat',
        },
        // 1. Bài viết chính (Featured Post - 1 bài)
        {
          name: 'featuredPost',
          type: 'relationship',
          relationTo: 'posts', // Slug của collection chứa các bài viết
          label: 'Bài viết chính (Featured Post)',
          required: false,
          admin: {
            description: 'Chọn 1 bài viết chính hiển thị ảnh lớn ở trên cùng',
          },
        },
        // 2. Danh sách các bài viết phụ (Sub-posts - danh sách)
        {
          name: 'subPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          label: 'Danh sách bài viết phụ',
          admin: {
            description: 'Chọn danh sách các bài viết nhỏ hiển thị bên dưới (thường là 4 bài)',
          },
        },
      ],
    },
  ],
}
