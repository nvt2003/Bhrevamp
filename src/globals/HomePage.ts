// src/globals/HomePage.ts
import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Trang Chủ',
  access: { read: () => true },
  fields: [
    // -------------------------------------------------------------
    // KHỐI 1: UTAMA + SIDEBAR (TERKINI & TRENDING)
    // -------------------------------------------------------------
    {
      name: 'utamaSection',
      type: 'group',
      label: 'Khối Utama & Sidebar Top',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Utama',
        },
        {
          name: 'featuredMain',
          type: 'relationship',
          relationTo: 'posts',
          label: 'Bài chính (Main Featured)',
        },
        {
          name: 'featuredSide',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 4,
          label: '4 Bài ảnh bên trái',
        },
        {
          name: 'featuredBullet',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          label: 'Các bài danh sách gạch đầu dòng (Bullets)',
        },
        {
          name: 'gridPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          label: 'Bài dạng Grid bên dưới Utama',
        },
        // Sidebar Config
        {
          name: 'terkiniLimit',
          type: 'number',
          defaultValue: 5,
          label: 'Số lượng bài Terkini (Cột phải - có ảnh)',
        },
        {
          name: 'trendingLimit',
          type: 'number',
          defaultValue: 5,
          label: 'Số lượng bài Trending (Cột phải - dạng list)',
        },
      ],
    },

    // -------------------------------------------------------------
    // KHỐI 2: DISYORKAN (1 BÀI TO + 6 BÀI NHỎ)
    // -------------------------------------------------------------
    {
      name: 'disyorkanSection',
      type: 'group',
      label: 'Khối Disyorkan (Đề xuất)',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Disyorkan',
        },
        {
          name: 'mainPost',
          type: 'relationship',
          relationTo: 'posts',
          label: '1 Bài lớn (Bên trái)',
        },
        {
          name: 'subPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          maxRows: 6,
          label: '6 Bài nhỏ (Bên phải)',
        },
      ],
    },
  ],
}
