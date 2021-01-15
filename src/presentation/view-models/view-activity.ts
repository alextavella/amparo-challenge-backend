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
  expire_date!: string
  expire_date_formatted!: string
  status!: number
  status_formatted!: string
  name!: string

  static map(entity: Activity): ActivityViewModel {
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

  static mapCollection(entities: Activity[]): ActivityViewModel[] {
    return entities.map(ActivityViewModel.map)
  }
}
