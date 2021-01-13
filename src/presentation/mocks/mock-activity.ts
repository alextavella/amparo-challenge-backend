import { Activity } from '@/domain/models'
import {
  ChangeActivityStatus,
  CreateActivities,
  LoadActivities,
} from '@/domain/usecases'
import { ChangeActivityStatusViewModel } from '@/presentation/view-models'
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
  response: LoadActivities.Response = {
    page: 1,
    size: 1,
    total: 0,
    data: [] as any,
  }

  load(model: LoadActivities.Model): Promise<LoadActivities.Response> {
    this.params = model
    this.response.page = model.page ?? 1
    this.response.size = model.size ?? 10
    return Promise.resolve(this.response)
  }
}

export class ChangeActivityStatusSpy implements ChangeActivityStatus {
  params?: ChangeActivityStatus.Model

  change(
    model: ChangeActivityStatus.Model,
  ): Promise<ChangeActivityStatusViewModel.Model> {
    this.params = model

    const response = {
      id: model.id,
      status: model.status,
    } as ChangeActivityStatusViewModel.Model

    return Promise.resolve(response)
  }
}
