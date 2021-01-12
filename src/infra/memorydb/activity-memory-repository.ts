import {
  CreateActivityRepository,
  LoadActivitiesRepository,
  LoadActivityByIdRepository,
  SaveActivityRepository,
} from '@/data/db'
import { Activity } from '@/domain/models'
import { CreateActivities } from '@/domain/usecases'
import { isAfter } from 'date-fns'
import { Collection, MemoryDb } from './db'

export class ActivityMemoryRepository
  implements
    CreateActivityRepository,
    LoadActivitiesRepository,
    LoadActivityByIdRepository,
    SaveActivityRepository {
  protected readonly collection: Collection

  constructor(collectionName = 'activities') {
    this.collection = new MemoryDb<Activity>().collection(collectionName)
  }

  async create(model: CreateActivities.Model): Promise<Activity> {
    const entity = this.collection.add(model)

    return Promise.resolve(entity as Activity)
  }

  async load(id: string): Promise<Activity | undefined> {
    const entity = this.collection.find((a: Activity) => a.id === id)

    return Promise.resolve(entity as Activity)
  }

  async loadByDate(date: Date = new Date()): Promise<Activity[]> {
    const entities = this.collection.filter((a: Activity) =>
      isAfter(a.expire_date, date),
    )

    return Promise.resolve(entities as Activity[])
  }

  async save(entity: Activity): Promise<Activity> {
    const index = this.collection.findIndex((a: Activity) => a.id === entity.id)

    if (index) {
      this.collection.update(index, entity)
    }

    return Promise.resolve(entity)
  }
}
