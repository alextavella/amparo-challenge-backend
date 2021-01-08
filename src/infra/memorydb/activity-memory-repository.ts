import {
  CreateActivityRepository,
  LoadActivityByIdRepository,
  SaveActivityRepository,
} from '@/data/db'
import { ActivityEntity, convertToActivityEntityStatus } from '@/data/entities'
import { CreateActivities } from '@/domain/usecases'
import { Collection, MemoryDb } from './db'

export class ActivityMemoryRepository
  implements
    CreateActivityRepository,
    LoadActivityByIdRepository,
    SaveActivityRepository {
  protected readonly collection: Collection

  constructor(collectionName = 'activities') {
    this.collection = new MemoryDb<ActivityEntity>().collection(collectionName)
  }

  async create(model: CreateActivities.Model): Promise<ActivityEntity> {
    const payload = Object.assign({}, model, {
      data_vencimento: new Date(model.data_vencimento),
      status: convertToActivityEntityStatus(model.status),
    } as ActivityEntity)

    const entity = this.collection.add(payload)

    return Promise.resolve(entity as ActivityEntity)
  }

  async load(id: string): Promise<ActivityEntity | undefined> {
    const entity = this.collection.find((a: ActivityEntity) => a.id === id)

    return Promise.resolve(entity as ActivityEntity)
  }

  async save(entity: ActivityEntity): Promise<ActivityEntity> {
    const index = this.collection.findIndex(
      (a: ActivityEntity) => a.id === entity.id,
    )

    if (index) {
      const { name, status } = entity

      Object.assign(entity, { name, status })

      this.collection.update(index, entity)
    }

    return Promise.resolve(entity)
  }
}
