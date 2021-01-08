import { ActivityEntity } from '@/data/entities'

export interface SaveActivityRepository {
  save(entity: ActivityEntity): Promise<ActivityEntity>
}
