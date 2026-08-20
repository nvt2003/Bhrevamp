import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime } from '@/utilities/formatTime'
import { getPostUrl } from '@/lib/routing/getPostUrl'

export default function BhTvSection({ data }: { data: any }) {
  if (!data) return null

  const { title = 'BH TV', channelLogo, mainVideo, subVideos = [] } = data
  const logoUrl = typeof channelLogo === 'object' ? channelLogo?.url : null

  // Reusable Component Badge Logo góc trái
  const BhtvLogoBadge = () => (
    <>
      {/* <div
        className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-red-600 via-red-600 to-transparent pointer-events-none z-10"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}
      /> */}
      {/* Vệt đỏ góc dưới bên trái có viền trắng cạnh huyền (Đỏ rõ hơn) */}
      <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none z-10">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 80 80"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="redGradientMoreRed" x1="0%" y1="100%" x2="100%" y2="0%">
              {/* Tăng độ đục lên 0.85 để màu đỏ đậm và rõ hơn */}
              <stop offset="0%" stopColor="rgba(220, 38, 38, 0.7)" />
              <stop offset="60%" stopColor="rgba(220, 38, 38, 0.7)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* Tam giác màu đỏ */}
          <polygon points="0,80 80,80 0,0" fill="url(#redGradientMoreRed)" />
          {/* Viền trắng cạnh huyền */}
          <line x1="0" y1="0" x2="80" y2="80" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-1.5 left-1.5 z-20">
        {logoUrl ? (
          <div className="relative w-7 h-7 border border-white rounded overflow-hidden bg-white shadow-xs">
            <Image src={logoUrl} alt="BH TV Logo" fill className="object-cover" />
          </div>
        ) : (
          <div className="w-7 h-7 border border-white rounded bg-yellow-400 flex flex-col items-center justify-center leading-none text-black font-extrabold shadow-xs">
            <span className="text-[9px] tracking-tighter">BH</span>
            <span className="text-[7px] bg-red-600 text-white px-0.5 mt-0.5 rounded-xs">TV</span>
          </div>
        )}
      </div>
    </>
  )

  return (
    <section className="my-8">
      {/* Header Section */}
      <div className="flex items-center justify-between pb-2 mb-4">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 -mb-2 pb-2 inline-block">
          {title}
        </h2>
        <Link href="/bh-tv" className="text-sm font-semibold flex items-center hover:underline">
          Lagi BH TV <span className="ml-1 text-red-600 font-bold">&gt;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* BÊN TRÁI: Video Chính Lớn (Col 5) */}
        {mainVideo && typeof mainVideo === 'object' && (
          <div className="lg:col-span-5 flex flex-col">
            <Link href={getPostUrl(mainVideo)} className="group block">
              <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden mb-3 rounded-xs">
                {mainVideo.featuredImage?.url && (
                  <Image
                    src={mainVideo.featuredImage.url}
                    alt={mainVideo.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 639px) 50vw, 25vw"
                    className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}

                {/* Giả lập Video Controls Player phía dưới */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 pt-6 flex items-center justify-between text-white text-xs z-30">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>0:00 / 1:15</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-white/20 px-1 rounded">CC</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                    </svg>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold line-clamp-2 group-hover:text-red-600 leading-snug">
                {mainVideo.title}
              </h3>
            </Link>
          </div>
        )}

        {/* BÊN PHẢI: Lưới 6 Video Nhỏ (Col 7 - Grid 3 Cột x 2 Hàng) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {subVideos.map((post: any) => {
            if (typeof post !== 'object') return null

            return (
              <div key={post.id} className="flex flex-col">
                <Link href={getPostUrl(post)} className="group block">
                  {/* Thumbnail có Logo Badge */}
                  <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden mb-2 rounded-xs">
                    {post.featuredImage?.url && (
                      <Image
                        src={post.featuredImage.url}
                        alt={post.title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 639px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    {/* Logo BH TV cho tất cả 6 video con */}
                    <BhtvLogoBadge />
                  </div>

                  {/* Category & Time */}
                  <div className="text-[11px] text-red-600 font-bold uppercase mb-0.5 flex items-center gap-1.5">
                    {post.category?.title || 'KES'}
                    <span className="text-gray-400 font-normal lowercase">
                      {formatRelativeTime(post.publishedAt)}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold line-clamp-3 group-hover:text-red-600 leading-snug">
                    {post.title}
                  </h4>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
