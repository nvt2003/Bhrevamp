import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="p-10 bg-blue-600 text-white rounded-xl text-center m-5">
      <h1 className="text-3xl font-bold">Kiểm tra Tailwind trong page.tsx</h1>
      <p className="mt-2 text-blue-100">
        Nếu thẻ này có nền màu xanh và chữ trắng là Tailwind đã nhận!
      </p>
    </div>
  )
}
