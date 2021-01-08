import { CreateActivityRepository } from '@/data/db'
import { ActivityEntity, ActivityStatus } from '@/data/entities'
import { CreateActivityService } from '@/data/usecases'
import { FakeMemoryDb } from './fake-db'

export class FakeActivityMemoryRepository implements CreateActivityRepository {
  private readonly collection = new FakeMemoryDb().collection<ActivityEntity>(
    'patients',
  )

  async create(model: CreateActivityService.Model): Promise<ActivityEntity> {
    const payload = Object.assign({}, model, {
      data_vencimento: new Date(model.data_vencimento),
      status: model.status as ActivityStatus,
    } as ActivityEntity)

    const entity = this.collection.add(payload)

    return Promise.resolve(entity as ActivityEntity)
  }
}
