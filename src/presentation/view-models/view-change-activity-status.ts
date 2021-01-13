import { Activity } from '@/domain/models'
import { formatDate } from '@/presentation/utils'
import { formatActivityStatus } from './view-activity'

export class ChangeActivityStatusViewModel {
  id!: string
  data_vencimento!: string
  status!: number
  status_formatado!: string
  nome!: string

  static map(
    entity: ChangeActivityStatusViewModel.Model,
  ): ChangeActivityStatusViewModel {
    const { id, expire_date, status, name } = entity

    return {
      id,
      data_vencimento: formatDate(expire_date),
      status: status,
      status_formatado: formatActivityStatus(status),
      nome: name,
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
