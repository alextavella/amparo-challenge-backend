import { Activity } from '@/domain/models'
import { formatDate } from '@/presentation/utils'
import { formatActivityStatus } from './view-activity'

export class ChangeActivityStatusViewModel {
  id!: string
  expire_date!: string
  expire_date_formatted!: string
  status!: number
  status_formatted!: string
  name!: string

  static map(
    entity: ChangeActivityStatusViewModel.Model,
  ): ChangeActivityStatusViewModel {
    const { id, expire_date, status, name } = entity

    return {
      id,
      expire_date: expire_date.toISOString(),
      expire_date_formatted: formatDate(expire_date),
      status: status,
      status_formatted: formatActivityStatus(status),
      name,
    }
  }

  static mapCollection(
    entities: ChangeActivityStatusViewModel.Model[],
  ): ChangeActivityStatusViewModel[] {
    return entities.map(ChangeActivityStatusViewModel.map)
  }
}

export namespace ChangeActivityStatusViewModel {
  export type Model = Omit<Activity, 'patient_id'>
}
