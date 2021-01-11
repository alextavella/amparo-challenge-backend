import { Activity } from '@/domain/models'
import { CreateActivities } from '@/domain/usecases'

export interface CreateActivityRepository {
  create(model: CreateActivities.Model): Promise<Activity>
}
