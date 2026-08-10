import type { CollectionConfig } from 'payload'

export const Sliders: CollectionConfig = {
  slug: 'sliders',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
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
      label: 'Hiburan, Bisnes...',
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
      label: 'position display',
      defaultValue: 0,
      admin: {
        description: 'Ascending',
      },
    },
  ],
}
