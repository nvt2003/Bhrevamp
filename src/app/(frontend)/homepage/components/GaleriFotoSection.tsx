import Link from 'next/link'
import Image from 'next/image'

export default function GaleriFotoSection({ data }: { data: any }) {
  if (!data || !data.galleryImages || data.galleryImages.length === 0) return null

  const { title = 'Galeri Foto', galleryImages = [] } = data

  return (
    <section className="my-8 max-w-md mx-auto lg:max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block">
          {title}
        </h2>
        <Link href="/galeri" className="text-sm font-semibold flex items-center hover:underline">
          Lagi Galeri <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>

      {/* Lưới ảnh Grid 4 cột */}
      <div className="grid grid-cols-4 gap-1">
        {galleryImages.map((item: any, index: number) => {
          const imgUrl = item.image?.url || item.image
          if (!imgUrl) return null

          return (
            <div
              key={item.id || index}
              className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden group cursor-pointer"
            >
              <Image
                src={imgUrl}
                alt={item.caption || `Galeri Foto ${index + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 639px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Overlay hover nhẹ */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
