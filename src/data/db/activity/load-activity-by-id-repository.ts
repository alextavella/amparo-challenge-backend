import { Activity } from '@/domain/models'

export interface LoadActivityByIdRepository {
  loadById(id: string): Promise<Activity | undefined>
}
