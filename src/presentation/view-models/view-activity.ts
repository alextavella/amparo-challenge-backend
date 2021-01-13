import { Activity, ActivityStatus } from '@/domain/models'
import { formatDate } from '@/presentation/utils/date'

export const formatActivityStatus = (status: ActivityStatus) => {
  const allStatus = {
    [ActivityStatus.aberto]: 'aberto',
    [ActivityStatus.atrasado]: 'atrasado',
    [ActivityStatus.finalizado]: 'finalizado',
  }
  return allStatus[status]
}

export class ActivityViewModel {
  id!: string
  data_vencimento!: string
  status!: number
  status_formatado!: string
  nome!: string

  static map(entity: Activity): ActivityViewModel {
    const { id, expire_date, status, name } = entity

    return {
      id,
      data_vencimento: formatDate(expire_date),
      status: status,
      status_formatado: formatActivityStatus(status),
      nome: name,
    }
  }

  static mapCollection(entities: Activity[]): ActivityViewModel[] {
    return entities.map(ActivityViewModel.map)
  }
}
