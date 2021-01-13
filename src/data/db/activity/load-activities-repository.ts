import { Activity, PaginationResponse } from '@/domain/models'

export interface LoadActivitiesRepository {
  loadByDate(
    page: number,
    size: number,
    date: Date,
  ): Promise<PaginationResponse<Activity[]>>
}
