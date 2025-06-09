export const formatName = (name?: string, maxLength = 10): string => {
  if (!name || typeof name !== "string" || name.trim() === "") return "User"

  const trimmed = name.trim()
  const capitalized = trimmed[0].toUpperCase() + trimmed.slice(1)

  if (capitalized.length <= maxLength) return capitalized

  const firstWord = capitalized.split(" ")[0]
  if (firstWord.length <= maxLength) return firstWord

  return `${capitalized.slice(0, maxLength)}...`
}
