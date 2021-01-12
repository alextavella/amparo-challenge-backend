import { CreateActivityService } from '@/data/usecases'
import { ActivityMemoryRepository, PatientMemoryRepository } from '@/infra'

export const makeCreateActivityService = () =>
  new CreateActivityService(
    new ActivityMemoryRepository(),
    new PatientMemoryRepository(),
  )
