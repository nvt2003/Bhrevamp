// app/(frontend)/[...segments]/page.tsx

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    segments: string[]
  }>
}

export default async function DynamicRouterPage({ params }: PageProps) {
  const { segments } = await params
  const payload = await getPayload({ config: configPromise })

  // -------------------------------------------------------------
  // TRƯỜNG HỢP 1: URL Bài viết chi tiết
  // Mẫu URL: /[category]/[year]/[month]/[articleId]/[postSlug]
  // Hoặc sub-category: /[category]/[subCategory]/[year]/[month]/[articleId]/[postSlug]
  // -------------------------------------------------------------

  // Bạn có thể nhận diện bài viết dựa vào articleId (thường là mảng có >= 5 phần tử và phần tử sát cuối là số)
  const isPostDetail = segments.length >= 5 && !isNaN(Number(segments[segments.length - 2]))

  if (isPostDetail) {
    const postSlug = segments[segments.length - 1]
    const articleId = segments[segments.length - 2]
    const month = segments[segments.length - 3]
    const year = segments[segments.length - 4]

    // Query bài viết theo articleId và slug
    const posts = await payload.find({
      collection: 'posts',
      where: {
        and: [{ postId: { equals: articleId } }, { slug: { equals: postSlug } }],
      },
      depth: 2,
      limit: 1,
    })

    const post = posts.docs[0]
    if (!post) notFound()

    // Kiểm tra tính chính xác của Ngày/Tháng (Validate optional)
    const createdAt = new Date(post.createdAt)
    const postYear = createdAt.getFullYear().toString()
    const postMonth = String(createdAt.getMonth() + 1).padStart(2, '0')

    if (postYear !== year || postMonth !== month) {
      notFound()
    }

    return (
      <article className="container mx-auto py-8">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-2">ID: {post.postId}</p>
        {/* Render nội dung bài viết */}
      </article>
    )
  }

  // -------------------------------------------------------------
  // TRƯỜNG HỢP 2: URL Danh mục (Category / Sub-category)
  // Mẫu URL: /[categorySlug] hoặc /[categorySlug]/[subCategorySlug]
  // -------------------------------------------------------------
  const categorySlug = segments[segments.length - 1]

  const categories = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: categorySlug },
    },
    limit: 1,
  })

  const category = categories.docs[0]

  if (category) {
    // Lay danh sach bài viết thuộc Category này
    const posts = await payload.find({
      collection: 'posts',
      where: {
        category: { equals: category.id },
      },
      limit: 10,
    })

    return (
      <main className="container mx-auto py-8">
        <h1 className="text-2xl font-bold uppercase mb-4">Chuyên mục: {category.name}</h1>
        <ul className="space-y-2">
          {posts.docs.map((p) => (
            <li key={p.id} className="border-b pb-2">
              <a href={`/${category.slug}/${p.postId}/${p.slug}`} className="hover:underline">
                {p.title}
              </a>
            </li>
          ))}
        </ul>
      </main>
    )
  }

  // Nếu không khớp với Bài viết lẫn Danh mục -> 404
  notFound()
}
