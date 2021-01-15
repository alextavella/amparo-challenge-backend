import { ListActivity } from '@/domain/models'
import { formatDate } from '@/presentation/utils/date'
import { formatActivityStatus } from './view-activity'

export class ListActivitiesViewModel {
  id!: string
  patient_name!: string
  patient_cpf!: string
  expire_date!: string
  expire_date_formatted!: string
  status!: number
  status_formatted!: string
  name!: string

  static map(entity: ListActivity): ListActivitiesViewModel {
    const { id, patient_name, patient_cpf, expire_date, status, name } = entity

    return {
      id,
      patient_name,
      patient_cpf,
      expire_date: expire_date.toISOString(),
      expire_date_formatted: formatDate(expire_date),
      status: status,
      status_formatted: formatActivityStatus(status),
      name,
    }
  }

  static mapCollection(entities: ListActivity[]): ListActivitiesViewModel[] {
    return entities.map(ListActivitiesViewModel.map)
  }
}
