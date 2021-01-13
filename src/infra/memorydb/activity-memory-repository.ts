import {
  CreateActivityRepository,
  LoadActivitiesRepository,
  LoadActivityByIdRepository,
  SaveActivityRepository,
} from '@/data/db'
import { Activity } from '@/domain/models'
import { CreateActivities } from '@/domain/usecases'
import { PaginationResponse } from './../../domain/models/pagination'
import { Collection, MemoryDb } from './db'

export class ActivityMemoryRepository
  implements
    CreateActivityRepository,
    LoadActivitiesRepository,
    LoadActivityByIdRepository,
    SaveActivityRepository {
  // eslint-disable-next-line @typescript-eslint/prefer-readonly
  protected collection: Collection

  constructor(collectionName = 'activities') {
    this.collection = MemoryDb.collection<Activity>(collectionName)
  }

  async create(model: CreateActivities.Model): Promise<Activity> {
    const entity = this.collection.add(model)

    return Promise.resolve(entity as Activity)
  }

  async load(id: string): Promise<Activity | undefined> {
    const entity = this.collection.find((a: Activity) => a.id === id)

    return Promise.resolve(entity as Activity)
  }

  async loadByDate(
    page: number,
    size: number,
    date: Date = new Date(),
  ): Promise<PaginationResponse<Activity[]>> {
    const filtered = this.collection.filter(
      (a: Activity) => a.expire_date >= date,
    )

    const init = size * (page - 1)
    const total = Math.round(filtered.length / size)
    const data = filtered.splice(Math.max(init, 0), size) as Activity[]

    const result = {
      page,
      size,
      total,
      data,
    }

    return Promise.resolve(result)
  }

  async save(entity: Activity): Promise<Activity> {
    const index = this.collection.findIndex((a: Activity) => a.id === entity.id)

    if (index) {
      this.collection.update(index, entity)
    }

    return Promise.resolve(entity)
  }
}
