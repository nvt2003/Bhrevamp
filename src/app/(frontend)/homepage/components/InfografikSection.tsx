import Link from 'next/link'
import Image from 'next/image'

export default function InfografikSection({ data }: { data: any }) {
  if (!data || !data.featuredImage) return null

  const { title = 'Infografik', featuredImage, linkUrl = '#' } = data

  return (
    <section className="my-8 max-w-md mx-auto lg:max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block">
          {title}
        </h2>
      </div>

      {/* Frame Infographic */}
      <div className="w-full bg-white rounded border border-gray-200 overflow-hidden shadow-sm">
        <Link href={linkUrl} className="block group">
          <div className="relative w-full aspect-[1/1.414] bg-slate-100 overflow-hidden">
            {featuredImage?.url && (
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || title}
                fill
                loading="lazy"
                sizes="(max-width: 639px) 50vw, 33vw"
                className="object-cover group-hover:scale-102 transition-transform duration-300"
              />
            )}
          </div>
        </Link>
      </div>
    </section>
  )
}
