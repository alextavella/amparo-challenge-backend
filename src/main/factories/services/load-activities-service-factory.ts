import { LoadActivitiesService } from '@/data/usecases'
import { ActivityMemoryRepository, PatientMemoryRepository } from '@/infra'

export const makeLoadActivitiesService = () =>
  new LoadActivitiesService(
    new ActivityMemoryRepository(),
    new PatientMemoryRepository(),
  )
