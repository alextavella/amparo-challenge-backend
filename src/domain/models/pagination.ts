export type PaginationModel = {
  page?: number
  size?: number
}

export type PaginationResponse<T> = {
  page: number
  size: number
  total: number
  data: T
}
