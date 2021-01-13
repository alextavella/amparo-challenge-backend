import { Activity, ListActivity, PaginationResponse } from '@/domain/models'
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
