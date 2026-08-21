import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // Cho phép đọc/tải ảnh công khai
  },
  // Khai báo đây là collection dạng Upload (lưu trữ file)
  upload: {
    staticDir: 'media', // Thư mục lưu file thực tế trên ổ đĩa
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'], // Chỉ cho phép upload file ảnh (bỏ dòng này nếu muốn cho upload cả pdf, docx...)
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Thẻ Alt (Mô tả hình ảnh)',
    },
  ],
}
