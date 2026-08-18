export function getPostUrl(post: any): string {
  if (!post) return '/'

  const date = new Date(post.publishedAt || post.createdAt)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')

  // Xử lý lấy slug danh mục (bao gồm parent nếu có)
  let categoryPath = ''
  if (post.category) {
    if (typeof post.category === 'object') {
      const parentSlug = post.category.parent?.slug
      const catSlug = post.category.slug
      categoryPath = parentSlug ? `${parentSlug}/${catSlug}` : catSlug
    }
  } else {
    categoryPath = 'news'
  }

  const postId = post.postId || post.id
  const slug = post.slug || ''

  return `/${categoryPath}/${year}/${month}/${postId}/${slug}`
}
