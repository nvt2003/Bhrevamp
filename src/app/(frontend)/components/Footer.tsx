import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Icons = {
  facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  twitter: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  whatsapp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  youtube: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  tiktok: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.56-1.26 2.56.02.82.42 1.62 1.07 2.13.79.62 1.87.82 2.82.52 1.05-.31 1.89-1.2 2.13-2.27.13-.57.12-1.16.12-1.74V.02z" />
    </svg>
  ),
  linkedin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
}

export default function Footer({ data }: { data: any }) {
  const { logo, socialLinks, appStoreLinks, columns, copyrightText, bottomLinks } = data
  return (
    <footer className="bg-[#333333] text-gray-300 text-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-10">
        {/* --- Top Row: Logo, Social Icons & App Badges --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logo?.url && (
              <Image
                src={logo.url}
                alt={logo.alt || 'Logo'}
                width={120}
                height={50}
                className="h-12 w-auto object-contain"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            {/* Social Icons */}
            <div className="flex items-center justify-between gap-2">
              {socialLinks?.map((item: any, idx: number) => {
                const IconComponent = Icons[item.platform as keyof typeof Icons]
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.platform}
                    className="w-9 h-9 rounded-full bg-neutral-700 hover:bg-neutral-600 text-white flex items-center justify-center transition-colors"
                  >
                    {IconComponent ? <IconComponent /> : null}
                  </a>
                )
              })}
            </div>

            {/* Mobile App Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {appStoreLinks?.appStoreUrl && (
                <a
                  href={appStoreLinks.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 w-[160px] items-center justify-center overflow-hidden rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-full w-full object-contain"
                  />
                </a>
              )}

              {appStoreLinks?.googlePlayUrl && (
                <a
                  href={appStoreLinks.googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 w-[160px] items-center justify-center overflow-hidden rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    className="h-full w-full scale-[1.35] object-contain"
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Line Divider */}
        <div className="border-t border-gray-600 my-6" />

        {/* --- Middle Row: Link Columns --- */}
        <div className="grid grid-cols-2 md:grid-cols-5 md:grid-flow-row grid-flow-col grid-rows-2 md:grid-rows-1 gap-4 justify-items-center">
          {columns?.map((col: any, colIdx: number) => (
            <div key={colIdx} className="space-y-2">
              {col.title && (
                <h4 className="text-white font-bold text-base mb-3 text-left w-full">
                  {col.title}
                </h4>
              )}
              <ul className="space-y-1.5 text-xs">
                {col.links?.map((link: any, linkIdx: number) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.url}
                      target={link.newTab ? '_blank' : '_self'}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* --- Bottom Red Bar --- */}
      <div className="bg-[#D30040] text-white text-xs py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div>{copyrightText}</div>

          {bottomLinks && bottomLinks.length > 0 && (
            <div className="flex items-center space-x-3">
              {bottomLinks.map((item: any, idx: number) => (
                <React.Fragment key={idx}>
                  <Link href={item.url} className="hover:underline">
                    {item.label}
                  </Link>
                  {idx < bottomLinks.length - 1 && <span>|</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
