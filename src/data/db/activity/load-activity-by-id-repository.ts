import { ActivityEntity } from '@/data/entities'

export interface LoadActivityByIdRepository {
  load(id: string): Promise<ActivityEntity | undefined>
}
