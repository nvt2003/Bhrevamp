import { GlobalConfig, Field } from 'payload'

// interface AdFieldsData {
//   sizePreset?: string
//   [key: string]: unknown
// }

const adSizeOptions = [
  { label: 'Leaderboard (970x90)', value: 'max-w-[970px] aspect-[970/90]' },
  { label: 'Medium Rectangle (300x250)', value: 'max-w-[300px] aspect-[300/250]' },
  { label: 'Mobile Banner (320x50)', value: 'max-w-[320px] aspect-[320/50]' },
  { label: 'Large Mobile Banner (320x100)', value: 'max-w-[320px] aspect-[320/100]' },
  { label: 'Khác (Tự nhập kích thước)', value: 'custom' },
]

// const createAdFields = (defaultSizeValue: string): Field[] => [
//   {
//     name: 'active',
//     type: 'checkbox',
//     defaultValue: false,
//     label: 'Kích hoạt quảng cáo',
//   },
//   {
//     name: 'imageUrl',
//     type: 'text',
//     label: 'Đường dẫn ảnh (Image URL)',
//   },
//   {
//     name: 'link',
//     type: 'text',
//     label: 'Đường dẫn liên kết (Link Click)',
//   },
//   {
//     name: 'code',
//     type: 'code',
//     label: 'Mã Script / HTML',
//     admin: { language: 'html' },
//   },
//   {
//     name: 'sizePreset',
//     type: 'select',
//     label: 'Kích thước quảng cáo',
//     defaultValue: defaultSizeValue,
//     options: adSizeOptions,
//   },
//   {
//     type: 'row',
//     admin: {
//       condition: (_: unknown, siblingData: Partial<AdFieldsData>) =>
//         siblingData?.sizePreset === 'custom',
//     },
//     fields: [
//       {
//         name: 'customWidth',
//         type: 'number',
//         label: 'Width (px)',
//         min: 1,
//       },
//       {
//         name: 'customHeight',
//         type: 'number',
//         label: 'Height (px)',
//         min: 1,
//       },
//     ],
//   },
// ]
const createAdFields = (defaultSizeValue: string): Field[] => [
  {
    name: 'active',
    type: 'checkbox',
    defaultValue: false,
  },
  {
    name: 'imageUrl',
    type: 'text',
  },
  {
    name: 'link',
    type: 'text',
  },
  {
    name: 'code',
    type: 'code',
    admin: {
      language: 'html',
    },
  },
  {
    name: 'sizePreset',
    type: 'select',
    defaultValue: defaultSizeValue,
    options: adSizeOptions,
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) => siblingData?.sizePreset === 'custom',
    },
    fields: [
      {
        name: 'customWidth',
        type: 'number',
        min: 1,
      },
      {
        name: 'customHeight',
        type: 'number',
        min: 1,
      },
    ],
  },
]
export const AdsConfig: GlobalConfig = {
  slug: 'ads-config',
  label: 'Ads Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // TAB 1: QC DESKTOP
        {
          label: 'Homepage Desktop Ads',
          fields: [
            {
              name: 'BH_Web_Billboard_Homepage_970x250',
              type: 'group',
              label: 'Ad 1',
              fields: createAdFields('max-w-[970px] aspect-[970/90]'),
            },
            {
              name: 'BH_300x250',
              type: 'group',
              label: 'Ad 2',
              fields: createAdFields('max-w-[300px] aspect-[300/250]'),
            },
            {
              name: 'BH_300x250_b',
              type: 'group',
              label: 'Ad 3',
              fields: createAdFields('max-w-[300px] aspect-[300/250]'),
            },
          ],
        },

        // TAB 2: QC MOBILE
        {
          label: 'Homepage Mobile Ads',
          fields: [
            {
              name: 'BH_320x50',
              type: 'group',
              label: '',
              fields: createAdFields('max-w-[320px] aspect-[320/50]'),
            },
            {
              name: 'BH_HP_Sticky_Leaderboard',
              type: 'group',
              label: 'Mobile Sticky Leaderboard',
              fields: [
                { name: 'active', type: 'checkbox', defaultValue: false },
                { name: 'imageUrl', type: 'text' },
                { name: 'link', type: 'text' },
                { name: 'code', type: 'code', admin: { language: 'html' } },
              ],
            },
            {
              name: 'BH_Mobile_Banner',
              type: 'group',
              label: 'Mobile Banner A',
              fields: createAdFields('max-w-[320px] aspect-[320/100]'),
            },
            {
              name: 'BH_Mobile_Banner_b',
              type: 'group',
              label: 'Mobile Banner B',
              fields: createAdFields('max-w-[320px] aspect-[320/100]'),
            },
            {
              name: 'BH_Multisize_HouseAds',
              type: 'group',
              label: '',
              fields: createAdFields('max-w-[970px] aspect-[970/90]'),
            },
          ],
        },
      ],
    },
  ],
}
