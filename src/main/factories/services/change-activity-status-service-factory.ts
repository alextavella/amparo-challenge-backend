import { ChangeActivityStatusService } from '@/data/usecases'
import { ActivityMemoryRepository } from '@/infra'

export const makeChangeActivityStatusService = () =>
  new ChangeActivityStatusService(new ActivityMemoryRepository())
