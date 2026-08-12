import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Configuration',
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
      label: 'Brand Logo',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: ['facebook', 'twitter', 'whatsapp', 'youtube', 'tiktok', 'linkedin'],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'appStoreLinks',
      type: 'group',
      label: 'App Mobile Links',
      fields: [
        { name: 'appStoreUrl', type: 'text', label: 'App Store URL' },
        { name: 'googlePlayUrl', type: 'text', label: 'Google Play URL' },
      ],
    },

    // Navigation Columns (5 Cột như trong ảnh)
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Columns',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Column Title (optional)',
        },
        {
          name: 'links',
          type: 'array',
          label: 'Column Links',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
            { name: 'newTab', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },

    // Bottom Copyright Bar
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Notice',
      defaultValue: '2025 © BH, New Straits Times Press (M) Bhd. All rights reserved.',
    },
    {
      name: 'bottomLinks',
      type: 'array',
      label: 'Bottom Policy Links',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
