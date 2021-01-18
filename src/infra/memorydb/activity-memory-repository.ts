import {
  CreateActivityRepository,
  LoadActivitiesRepository,
  LoadActivityByIdRepository,
  SaveActivityRepository,
} from '@/data/db'
import { Activity, PaginationResponse } from '@/domain/models'
import { CreateActivities } from '@/domain/usecases'
import { isSameDay } from 'date-fns'
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

  async loadById(id: string): Promise<Activity | undefined> {
    const entity = this.collection.find((a: Activity) => a.id === id)

    return Promise.resolve(entity as Activity)
  }

  async load(
    page: number,
    size: number,
    params: LoadActivitiesRepository.Params,
  ): Promise<PaginationResponse<Activity[]>> {
    let filtered = this.collection.filter((a: Activity) =>
      isSameDay(a.expire_date, params.date),
    ) as Activity[]

    if (params.status && params.status >= 0) {
      filtered = filtered.filter((a) => a.status === params.status)
    }

    const total = filtered.length
      ? Math.max(Math.ceil(filtered.length / size), 1)
      : 0

    const init = size * (page - 1)
    const data = filtered.splice(Math.max(init, 0), size)

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
