export default function UtamaSection({ formattedUtama }: { formattedUtama: any }) {
  const { featuredMain, featuredSide, featuredBullet } = formattedUtama

  return (
    <section className="max-w-6xl mx-auto p-4 font-sans text-gray-900">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">Utama</div>
        <div className="w-10 h-1 bg-rose-600 mt-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Side News Grid (4 items) */}
        <div className="md:col-span-5 grid grid-cols-1 gap-4">
          {featuredSide?.map((item: any) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded shadow-sm aspect-[16/9]"
            >
              <img
                src={item.featuredImage?.url}
                alt={item.featuredImage?.alt || item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className="text-[#D81B50] font-bold uppercase tracking-wide">
                    {item.category?.name}
                  </span>
                  <span className="text-gray-300">18 minit lepas</span>
                </div>
                <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Main Feature & Bullets */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {/* Main Featured Item */}
          {featuredMain && (
            <div>
              <div className="overflow-hidden rounded shadow-sm aspect-[16/9] mb-4">
                <img
                  src={featuredMain.featuredImage?.url}
                  alt={featuredMain.featuredImage?.alt || featuredMain.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2 text-sm mb-2">
                <span className="text-[#D81B50] font-bold">{featuredMain.category?.name}</span>
                <span className="text-gray-500 text-xs">18 minit lepas</span>
              </div>

              <h1 className="text-xl md:text-2xl font-bold leading-tight mb-2 hover:text-[#D81B50] cursor-pointer">
                {featuredMain.title}
              </h1>

              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{featuredMain.summary}</p>
            </div>
          )}

          {/* Bullet List */}
          <div className="border-t border-gray-200 divide-y divide-gray-100">
            {featuredBullet?.map((bullet: any) => (
              <div key={bullet.id} className="py-3 flex items-start gap-3 group cursor-pointer">
                <span className="w-2.5 h-2.5 bg-[#D81B50] mt-1.5 shrink-0 inline-block"></span>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#D81B50] transition-colors leading-snug">
                  {bullet.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
