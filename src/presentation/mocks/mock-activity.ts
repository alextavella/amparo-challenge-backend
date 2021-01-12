import { Activity } from '@/domain/models'
import { CreateActivities } from '@/domain/usecases'
import { v4 as uuid } from 'uuid'

export class CreateActivitySpy implements CreateActivities {
  params: CreateActivities.Model = {} as CreateActivities.Model

  async create(model: CreateActivities.Model): Promise<Activity> {
    this.params = model
    return Promise.resolve({
      id: uuid(),
      ...model,
    })
  }
}
