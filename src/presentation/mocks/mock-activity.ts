import { Activity, ListActivity, PaginationResponse } from '@/domain/models'
import { CreateActivities, LoadActivities } from '@/domain/usecases'
import { v4 as uuid } from 'uuid'

export class CreateActivitySpy implements CreateActivities {
  params?: CreateActivities.Model

  async create(model: CreateActivities.Model): Promise<Activity> {
    this.params = model
    return Promise.resolve({
      id: uuid(),
      ...model,
    })
  }
}

export class LoadActivitiesSpy implements LoadActivities {
  params?: LoadActivities.Model

  load(
    model: LoadActivities.Model,
  ): Promise<PaginationResponse<ListActivity[]>> {
    this.params = model

    const response = {
      page: +!model.page,
      size: +!model.size,
      total: 0,
      data: [],
    }

    return Promise.resolve(response)
  }
}
