import { ActivityEntity } from '@/data/entities'
import { CreateActivities } from '@/domain/usecases'

export interface CreateActivityRepository {
  create(model: CreateActivities.Model): Promise<ActivityEntity>
}
