import type { GlobalConfig } from 'payload'
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Cài đặt trang chủ',
  access: { read: () => true },
  fields: [
    //Danh sách Trending Keywords
    {
      name: 'trending_in_top',
      type: 'array',
      label: 'Từ khoá Trending (Hiển thị trên Top Bar)',
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
      label: 'Cài đặt video nổi (Popup Video Floating)',
      fields: [
        {
          name: 'enable',
          type: 'checkbox',
          label: 'Hiển thị video nổi (Popup Video Floating)',
          defaultValue: true,
        },
        {
          name: 'video_url',
          type: 'text',
          label: 'Đường dẫn video (YouTube, Vimeo, v.v.)',
          admin: {
            placeholder: 'https://www.youtube.com/watch?v=...',
            description:
              'Sử dụng URL từ YouTube và các trang web khác cho phép hiển thị video với liên kết',
            condition: (_, siblingData) => Boolean(siblingData?.enable),
          },
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Ảnh thumbnail video nổi (Popup Video Floating)',
          admin: {
            description: 'Hiển thị nếu URL video không hợp lệ, không thể phát video',
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
      label: 'Phần chính & Sidebar Top',
      fields: [
        {
          name: 'title',
          label: 'Tiêu đề',
          type: 'text',
          defaultValue: 'Chính',
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
          label: 'Bài dạng Grid bên dưới phần chính',
        },
        // Sidebar Config
        {
          name: 'terkiniLimit',
          type: 'number',
          defaultValue: 5,
          label: 'Số lượng hiển thị bài báo mới (Cột phải - có ảnh)',
        },
        {
          name: 'trendingLimit',
          type: 'number',
          defaultValue: 5,
          label: 'Số lượng bài báo trending (Cột phải - dạng danh sách)',
        },
      ],
    },

    // -------------------------------------------------------------
    // KHỐI 2: DISYORKAN (1 BÀI TO + 6 BÀI NHỎ)
    // -------------------------------------------------------------
    {
      name: 'disyorkanSection',
      type: 'group',
      label: 'Phần đề xuất',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Đề xuất',
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
      label: 'Chuyên mục',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Chuyên mục',
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
      label: 'Thể thao',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Thể thao',
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
      label: 'Thế giới',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Thế giới',
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
      label: 'Kinh tế',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Kinh tế',
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
      label: 'Giải trí',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Giải trí',
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
      label: 'Phong cách sống',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Phong cách sống',
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
      label: 'Độc quyền',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Độc quyền',
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
          label: 'Đồ hoạ thông tin (Infografik)',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Đồ hoạ thông tin (Infografik)',
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
          label: 'Bộ sưu tập ảnh',
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Bộ sưu tập ảnh',
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
      label: 'Đồ hoạ thông tin (Infografik)',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Đồ hoạ thông tin (Infografik)',
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
      label: 'Bộ sưu tập ảnh',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Bộ sưu tập ảnh',
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
      label: 'Podcast',
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
      label: 'BH TV',
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
      label: 'Video mới nhất',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Video mới nhất',
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
      label: 'Sức khoẻ',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề Section',
          defaultValue: 'Sức khoẻ',
          required: true,
        },
        {
          name: 'moreText',
          type: 'text',
          label: 'Text nút Xem thêm',
          defaultValue: 'Xem thêm mục sức khoẻ',
        },
        {
          name: 'moreLink',
          type: 'text',
          label: 'Đường dẫn Xem thêm',
          defaultValue: '/suc-khoe',
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
