import { Activity } from '@/domain/models'
import { ActivityMemoryRepository } from '@/infra/memorydb/activity-memory-repository'
import { FakeMemoryDb } from './fake-db'

export class FakeActivityMemoryRepository extends ActivityMemoryRepository {
  constructor(private readonly collectionName = 'activities_tests') {
    super(collectionName)
    super.collection = new FakeMemoryDb().collection<Activity>(collectionName)
  }
}
