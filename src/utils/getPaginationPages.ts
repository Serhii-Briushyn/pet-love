export const getPaginationPages = (
  currentPage: number,
  totalPages: number,
  isMobile: boolean,
): (number | string)[] => {
  const pages: (number | string)[] = []
  const visibleCount = isMobile ? 2 : 3

  if (totalPages <= visibleCount + 1) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    if (currentPage <= totalPages - visibleCount) {
      pages.push(currentPage)
      for (let i = 1; i < visibleCount; i++) {
        const next = currentPage + i
        if (next <= totalPages) pages.push(next)
      }
      if (currentPage + visibleCount <= totalPages) {
        pages.push("...")
      }
    } else {
      if (totalPages - visibleCount > 1) {
        pages.push("...")
      }
      for (let i = visibleCount - 1; i >= 0; i--) {
        const page = totalPages - i
        pages.push(page)
      }
    }
  }

  return pages
}
