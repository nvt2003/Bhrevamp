export function formatRelativeTime(dateString?: string | Date | null): string {
  if (!dateString) return ''

  const now = new Date()
  const publishedDate = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - publishedDate.getTime()) / 1000)

  // Nếu thời gian nhỏ hơn 1 phút
  if (diffInSeconds < 60) {
    return 'Vừa xong'
  }

  const minutes = Math.floor(diffInSeconds / 60)
  if (minutes < 60) {
    return `${minutes} phút trước`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} giờ trước`
  }

  const days = Math.floor(hours / 24)
  if (days < 30) {
    return `${days} ngày trước`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return `${months} tháng trước`
  }

  const years = Math.floor(months / 12)
  return `${years} năm trước`
}
