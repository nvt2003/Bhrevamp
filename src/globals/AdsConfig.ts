import { GlobalConfig } from 'payload/types'

export const AdsConfig: GlobalConfig = {
  slug: 'ads-config',
  label: 'Quản lý Quảng cáo',
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
              name: 'BH',
              type: 'group',
              label: 'Ad 1',
              fields: [
                { name: 'active', type: 'checkbox', defaultValue: true },
                { name: 'imageUrl', type: 'text', label: 'Image' },
                { name: 'link', type: 'text', label: 'Url' },
                {
                  name: 'code',
                  type: 'code',
                  label: 'Ads Code',
                  admin: { language: 'html' },
                },
              ],
            },
            {
              name: 'Ad_Before_Terkini',
              type: 'group',
              label: 'Ad 2',
              fields: [
                { name: 'active', type: 'checkbox', defaultValue: true },
                { name: 'imageUrl', type: 'text', label: 'Image' },
                { name: 'link', type: 'text', label: 'Url' },
                {
                  name: 'code',
                  type: 'code',
                  label: 'Ads Code',
                  admin: { language: 'html' },
                },
              ],
            },
            {
              name: 'Ad_Before_Poscast',
              type: 'group',
              label: 'Ad 3',
              fields: [
                { name: 'active', type: 'checkbox', defaultValue: true },
                { name: 'imageUrl', type: 'text', label: 'Image' },
                { name: 'link', type: 'text', label: 'Url' },
                {
                  name: 'code',
                  type: 'code',
                  label: 'Ads Code',
                  admin: { language: 'html' },
                },
              ],
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
              fields: [
                { name: 'active', type: 'checkbox', defaultValue: true },
                { name: 'imageUrl', type: 'text', label: 'Image' },
                { name: 'link', type: 'text', label: 'Url' },
                {
                  name: 'code',
                  type: 'code',
                  label: 'Ads Code',
                  admin: { language: 'html' },
                },
              ],
            },
            {
              name: 'BH_HP_Sticky_Leaderboard',
              type: 'group',
              label: 'Mobile Sticky Leaderboard',
              fields: [
                { name: 'active', type: 'checkbox', defaultValue: true },
                { name: 'imageUrl', type: 'text' },
                { name: 'link', type: 'text' },
                { name: 'code', type: 'code', admin: { language: 'html' } },
              ],
            },
            {
              name: 'BH_Mobile_Banner',
              type: 'group',
              label: 'Mobile Banner A',
              fields: [
                { name: 'active', type: 'checkbox', defaultValue: true },
                { name: 'imageUrl', type: 'text' },
                { name: 'link', type: 'text' },
                { name: 'code', type: 'code', admin: { language: 'html' } },
              ],
            },
            {
              name: 'BH_Mobile_Banner_b',
              type: 'group',
              label: 'Mobile Banner B',
              fields: [
                { name: 'active', type: 'checkbox', defaultValue: true },
                { name: 'imageUrl', type: 'text' },
                { name: 'link', type: 'text' },
                { name: 'code', type: 'code', admin: { language: 'html' } },
              ],
            },
            {
              name: 'BH_Multisize_HouseAds',
              type: 'group',
              label: '',
              fields: [
                { name: 'active', type: 'checkbox', defaultValue: true },
                { name: 'imageUrl', type: 'text', label: 'Image' },
                { name: 'link', type: 'text', label: 'Url' },
                {
                  name: 'code',
                  type: 'code',
                  label: 'Ads Code',
                  admin: { language: 'html' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
