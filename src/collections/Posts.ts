import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },

  fields: [
    // =========================
    // THÔNG TIN CƠ BẢN
    // =========================
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
      index: true,
    },

    {
      name: 'excerpt',
      type: 'textarea',
    },

    {
      name: 'content',
      type: 'richText',
      required: true,
    },

    // =========================
    // ẢNH
    // =========================
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },

    // =========================
    // PHÂN LOẠI
    // =========================
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      index: true,
    },

    // {
    //   name: 'tags',
    //   type: 'relationship',
    //   relationTo: 'tags',
    //   hasMany: true,
    // },

    // =========================
    // TÁC GIẢ
    // =========================
    // {
    //   name: 'author',
    //   type: 'relationship',
    //   relationTo: 'users',
    // },

    // =========================
    // TRẠNG THÁI
    // =========================
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      index: true,
    },

    {
      name: 'publishedAt',
      type: 'date',
      index: true,
    },

    // =========================
    // TRANG CHỦ
    // =========================
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },

    // =========================
    // SEO
    // =========================
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'relatedPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
        },
      ],
    },
  ],
}
