import { revalidateTag } from 'next/cache'
import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header Settings',
  access: {
    read: () => true,
  },
  fields: [
    // 1. Danh sách Sliders (Banner slider ở header)
    {
      name: 'sliders',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      label: 'Header Sliders',
      admin: {
        description: 'Chọn các bài viết sẽ hiển thị trên Slider của Header',
      },
    },

    // 3. Vùng mở rộng tương lai (Ví dụ: Menu chính, Logo, Hotline, Announcement Bar...)
    /*
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Header Logo',
    },
    */
  ],
  hooks: {
    afterChange: [
      () => {
        // Xóa cache ngay lập tức khi Admin lưu thay đổi
        revalidateTag('global-header', 'max')
      },
    ],
  },
}
