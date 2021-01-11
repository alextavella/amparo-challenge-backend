import { Activity } from '@/domain/models'

export interface LoadActivitiesRepository {
  loadByDate(data: Date): Promise<Activity[]>
}
