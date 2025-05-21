export const sortingOptions = [
  { label: 'Popular', key: 'byPopularityAsc' },
  { label: 'Unpopular', key: 'byPopularityDesc' },
  { label: 'Cheap', key: 'byPriceAsc' },
  { label: 'Expensive', key: 'byPriceDesc' },
] as const

export type SortingKey = (typeof sortingOptions)[number]['key']
