import { Activity, ActivityStatus } from '@/domain/models'
import { formatDate } from '@/presentation/utils/date'

const formatActivityStatus = (status: ActivityStatus) => {
  const allStatus = {
    [ActivityStatus.aberto]: 'aberto',
    [ActivityStatus.atrasado]: 'atrasado',
    [ActivityStatus.finalizado]: 'finalizado',
  }
  return allStatus[status]
}

export class CreateActivitiesViewModel {
  id!: string
  data_vencimento!: string
  status!: number
  status_formatado!: string
  nome!: string

  static map(entity: Activity): CreateActivitiesViewModel {
    const { id, expire_date, status, name } = entity

    return {
      id,
      data_vencimento: formatDate(expire_date),
      status: status,
      status_formatado: formatActivityStatus(status),
      nome: name,
    }
  }

  static mapCollection(entities: Activity[]): CreateActivitiesViewModel[] {
    return entities.map(CreateActivitiesViewModel.map)
  }
}
