import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Danh mục',
    plural: 'Danh mục',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Tên danh mục',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'parent',
      label: 'Danh mục cha (Không bắt buộc)',
      type: 'relationship',
      relationTo: 'categories',
      index: true,
    },
  ],
}
