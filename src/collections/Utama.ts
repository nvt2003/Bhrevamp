import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
      defaultValue: () => new Date(),
    },
    {
      name: 'position',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Featured Main (biggest)', value: 'featured_main' },
        { label: 'Featured Side (left sidebar)', value: 'featured_side' },
        { label: 'Featured Bullet (list, no image)', value: 'featured_bullet' },
        { label: 'Grid Standard (grid in bottom)', value: 'grid' },
      ],
    },
  ],
}
