import type { CollectionConfig } from 'payload'

export const Trending: CollectionConfig = {
  slug: 'trending',
  admin: {
    useAsTitle: 'keyword',
  },
  access: { read: () => true },
  fields: [
    { name: 'keyword', type: 'text', required: true, label: 'Từ khóa' },
    { name: 'order', type: 'number', defaultValue: 0, label: 'Thứ tự' },
  ],
}
