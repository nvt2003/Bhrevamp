import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Cài đặt header',
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
      label: 'Danh sách bài viết hiển thị trên Slider',
      admin: {
        description: 'Choose posts will display on Slider of Header',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Header Logo',
    },
    {
      name: 'title_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Hình ảnh tiêu đề',
      admin: {
        description: 'Hình ảnh thương hiệu, hiển thị bên cạnh Logo',
      },
    },

    // Mã HTML hiển thị tạm thời
    {
      name: 'fallback_html',
      type: 'code',
      label: 'HTML hiển thị tạm (Fallback)',
      defaultValue: `<div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;">
                      <h1 style="font-size: 24px; color: #333;">Header</h1>
                    </div>`,
      admin: {
        language: 'html',
        description: 'Nhập đoạn mã HTML/JSX hiển thị tiêu đề tạm thời khi chưa tải ảnh lên',
      },
    },

    // Danh sách Social Links
    {
      name: 'social_links',
      type: 'group',
      label: 'Liên kết mạng xã hội',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'X (Twitter) URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok URL',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        // Chỉ revalidate khi request đến từ Next.js
        if (req.context?.skipRevalidation) {
          return
        }
        const { revalidateTag } = await import('next/cache')
        revalidateTag('global-header', 'max')
      },
    ],
  },
}
