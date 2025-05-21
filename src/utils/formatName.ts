export const formatName = (name?: string, maxLength = 10): string => {
  if (!name || typeof name !== "string" || name.trim() === "") return "User"

  const trimmed = name.trim()
  const capitalized = trimmed[0].toUpperCase() + trimmed.slice(1)

  return capitalized.length > maxLength ? `${capitalized.slice(0, maxLength)}...` : capitalized
}
