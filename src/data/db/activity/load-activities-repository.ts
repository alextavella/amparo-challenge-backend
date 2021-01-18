import { Activity, ActivityStatus, PaginationResponse } from '@/domain/models'

export interface LoadActivitiesRepository {
  load(
    page: number,
    size: number,
    params: LoadActivitiesRepository.Params,
  ): Promise<PaginationResponse<Activity[]>>
}

export namespace LoadActivitiesRepository {
  export type Params = {
    date: Date
    status?: ActivityStatus
  }
}
