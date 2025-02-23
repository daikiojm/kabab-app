export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const formatMonthYear = (dateString: string): string => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return `${year}年${month}月`
}

export const groupByMonth = <T extends { createdAt: string }>(
  items: T[]
): { [key: string]: T[] } => {
  return items.reduce((acc, item) => {
    const monthYear = formatMonthYear(item.createdAt)
    if (!acc[monthYear]) {
      acc[monthYear] = []
    }
    acc[monthYear].push(item)
    return acc
  }, {} as { [key: string]: T[] })
}
