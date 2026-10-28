import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Cài đặt footer',
  access: {
    read: () => true,
  },
  fields: [
    // Top Bar Settings
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Đường dẫn mạng xã hội',
      fields: [
        {
          name: 'platform',
          label: 'Nền tảng',
          type: 'select',
          options: ['facebook', 'twitter', 'whatsapp', 'youtube', 'tiktok', 'linkedin'],
          required: true,
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'appStoreLinks',
      type: 'group',
      label: 'Đường dẫn tải ứng dụng',
      fields: [
        { name: 'appStoreUrl', type: 'text', label: 'App Store URL' },
        { name: 'googlePlayUrl', type: 'text', label: 'Google Play URL' },
      ],
    },

    // Navigation Columns (5 Cột như trong ảnh)
    {
      name: 'columns',
      type: 'array',
      label: 'Nội dung cột điều hướng',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề (Không bắt buộc)',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Nội dung cột',
          fields: [
            { name: 'label', label: 'Nhãn', type: 'text', required: true },
            { name: 'url', label: 'URL', type: 'text', required: true },
            { name: 'newTab', label: 'Mở trong tab mới', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },

    // Bottom Copyright Bar
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Notice',
      defaultValue: '2025 ©, New Straits Times Press (M) Bhd. All rights reserved.',
    },
    {
      name: 'bottomLinks',
      type: 'array',
      label: 'Liên kết ở cuối trang',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
