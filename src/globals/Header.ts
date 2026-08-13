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
      type: 'array',
      label: 'Header Sliders',
      labels: {
        singular: 'Slider',
        plural: 'Sliders',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          label: 'Category (Hiburan, Bisnes...)',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          label: 'Link',
          required: true,
          admin: {
            description: 'Link when click on',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          label: 'Position Display',
          defaultValue: 0,
          admin: {
            description: 'Ascending',
          },
        },
      ],
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
}
