export interface PaginatedFeature<T = {}> {
  data: T[]
  totalResultsCount: number
}
