import { Activity } from '@/domain/models'

export interface LoadActivityByIdRepository {
  load(id: string): Promise<Activity | undefined>
}
