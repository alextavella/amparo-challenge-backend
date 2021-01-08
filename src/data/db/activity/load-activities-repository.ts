import { ActivityEntity } from '@/data/entities'

export interface LoadActivitiesRepository {
  loadByDate(data: Date): Promise<ActivityEntity[]>
}
