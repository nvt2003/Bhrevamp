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
      label: 'Brand Title Image',
      admin: {
        description: 'Brand Image, display next to Logo',
      },
    },

    // Mã HTML hiển thị tạm thời
    {
      name: 'fallback_html',
      type: 'code',
      label: 'HTML hiển thị tạm (Fallback)',
      defaultValue: `<a href="/" class="flex items-center gap-3 group">
        <div class="w-12 h-12 bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-400 dark:border-gray-600 rounded flex flex-col items-center justify-center text-gray-400 group-hover:border-red-600 transition-colors">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          <span class="text-[9px] font-mono leading-none mt-1">LOGO</span>
        </div>

        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="font-sans font-black text-xl md:text-2xl uppercase tracking-tight text-[#D81B50]">
              MEDIA RUJUKAN MASSA
            </span>
          </div>
          <p class="text-xs font-bold text-gray-600 mt-0.5">
            Portal berita dan akhbar No. 1 di Malaysia
          </p>
        </div>
      </a>`,
      admin: {
        language: 'html',
        description: 'Nhập đoạn mã HTML/JSX hiển thị tiêu đề tạm thời khi chưa tải ảnh lên',
      },
    },

    // Danh sách Social Links
    {
      name: 'social_links',
      type: 'group',
      label: 'Mạng xã hội (Social Links)',
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
