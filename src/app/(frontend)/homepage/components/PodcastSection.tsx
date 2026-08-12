import Link from 'next/link'
import Image from 'next/image'

export default function PodcastSection({ data }: { data: any }) {
  if (!data) return null

  const { title = 'Podcast', channelLogo, videos = [] } = data
  const logoUrl = typeof channelLogo === 'object' ? channelLogo?.url : null

  return (
    <section className="my-8 max-w-md mx-auto lg:max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block">
          {title}
        </h2>
        <Link href="/podcast" className="text-sm font-semibold flex items-center hover:underline">
          Lagi BH TV <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>

      {/* Danh sách 3 Video xếp dọc */}
      <div className="flex flex-col gap-6">
        {videos.map((post: any) => {
          if (typeof post !== 'object') return null

          return (
            <div key={post.id} className="flex flex-col">
              <Link href={`/posts/${post.slug}`} className="group block">
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden mb-3">
                  {post.featuredImage?.url && (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                  )}

                  {/* Nút Play ở chính giữa */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                      <svg
                        className="w-6 h-6 text-white translate-x-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Vệt đỏ trang trí góc dưới bên trái (Red Ribbon Effect) */}
                  <div
                    className="absolute bottom-0 left-0 w-28 h-16 bg-gradient-to-tr from-red-600 via-red-600 to-transparent clip-triangle pointer-events-none"
                    style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}
                  />

                  {/* Logo Badge ở góc dưới bên trái */}
                  <div className="absolute bottom-2 left-2 z-10">
                    {logoUrl ? (
                      <div className="relative w-9 h-9 border-2 border-white rounded overflow-hidden bg-white shadow-md">
                        <Image src={logoUrl} alt="Channel Logo" fill className="object-cover" />
                      </div>
                    ) : (
                      /* Badge Logo fallback đẹp chuẩn kiểu BH TV */
                      <div className="w-9 h-9 border-2 border-white rounded bg-yellow-400 flex flex-col items-center justify-center leading-none text-black font-extrabold shadow-md">
                        <span className="text-[11px] tracking-tighter">BH</span>
                        <span className="text-[9px] bg-red-600 text-white px-0.5 mt-0.5 rounded-xs">
                          TV
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tiêu đề Video */}
                <h3 className="text-base font-bold line-clamp-3 group-hover:text-red-600 leading-snug">
                  {post.title}
                </h3>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
