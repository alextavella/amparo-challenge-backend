import { ActivityMemoryRepository } from '@/infra/memorydb/activity-memory-repository'

export class FakeActivityMemoryRepository extends ActivityMemoryRepository {
  constructor() {
    super('patients_tests')
  }
}
