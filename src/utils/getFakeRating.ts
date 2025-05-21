export const getFakeRating = (popularity: number): number => {
  if (popularity > 5000) return 5
  if (popularity > 3000) return 4
  if (popularity > 1500) return 3
  if (popularity > 500) return 2
  return 1
}
