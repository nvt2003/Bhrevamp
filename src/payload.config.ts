import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { payloadCloudinaryPlugin } from '@jhb.software/payload-cloudinary-plugin'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Posts } from './collections/Posts'
import { HomePage } from './globals/HomePage'
import { Footer } from './globals/Footer'
import { AdsConfig } from './globals/AdsConfig'
import { Header } from './globals/Header'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [HomePage, Footer, AdsConfig, Header],
  collections: [Users, Media, Categories, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudinaryPlugin({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      credentials: {
        apiKey: process.env.CLOUDINARY_API_KEY!,
        apiSecret: process.env.CLOUDINARY_API_SECRET!,
      },
      collections: {
        media: true, // Kích hoạt Cloudinary cho collection 'media'
      },
      folder: 'payload-media', // Thư mục lưu trên Cloudinary
    }),
  ],
})
