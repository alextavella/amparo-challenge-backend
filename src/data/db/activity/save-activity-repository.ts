import { Activity } from '@/domain/models'

export interface SaveActivityRepository {
  save(model: Activity): Promise<Activity>
}
