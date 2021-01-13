import { ListActivity } from '@/domain/models'
import { formatDate } from '@/presentation/utils/date'
import { formatActivityStatus } from './view-activity'

export class ListActivitiesViewModel {
  id!: string
  nome_paciente!: string
  data_vencimento!: string
  status!: number
  status_formatado!: string
  nome!: string

  static map(entity: ListActivity): ListActivitiesViewModel {
    const { id, patient_name, expire_date, status, name } = entity

    return {
      id,
      nome_paciente: patient_name,
      data_vencimento: formatDate(expire_date),
      status: status,
      status_formatado: formatActivityStatus(status),
      nome: name,
    }
  }

  static mapCollection(entities: ListActivity[]): ListActivitiesViewModel[] {
    return entities.map(ListActivitiesViewModel.map)
  }
}
