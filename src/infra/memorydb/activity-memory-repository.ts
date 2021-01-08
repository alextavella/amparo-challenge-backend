import { CreateActivityRepository } from '@/data/db'
import { ActivityEntity } from '@/data/entities'
import { CreateActivityService } from '@/data/usecases'
import { ActivityStatus } from '@/domain/models'
import { CreateActivities } from '@/domain/usecases'
import { MemoryDb } from './db'

export class ActivityMemoryRepository implements CreateActivityRepository {
  private readonly collection = new MemoryDb().collection<ActivityEntity>(
    'patients',
  )

  async create(
    model: CreateActivities.Model,
  ): Promise<CreateActivityService.Response> {
    const payload = Object.assign({}, model, {
      data_vencimento: new Date(model.data_vencimento),
      status: ActivityStatus[model.status as keyof typeof ActivityStatus],
    } as ActivityEntity)

    const entity = await this.collection.add(payload)

    return entity as CreateActivityService.Response
  }
}
