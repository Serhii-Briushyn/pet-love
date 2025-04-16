type Page = "register" | "login" | "add"
type Screen = "mobile" | "tablet" | "desktop"
type Size = "1x" | "2x"
type Type = "img" | "bg"

interface GetImagePathProps {
  page: Page
  screen: Screen
  size: Size
  type: Type
  folder?: string
}

export const getImagePath = ({ page, screen, size, type, folder }: GetImagePathProps): string => {
  const postfix = size === "2x" ? "@2x" : ""
  const fileName = type === "bg" ? `bg-${screen}${postfix}.png` : `pet-${screen}-img${postfix}.png`

  return `/images/${folder}/${page}/${fileName}`
}
