import { NoticeBase } from "@store/notices/types"

export const formatPrice = (notice: Pick<NoticeBase, "category" | "price">): string => {
  if (notice.category === "free") return "Free"
  if (notice.category === "sell" && typeof notice.price === "number") return `$${notice.price}`
  return "Price not specified"
}
